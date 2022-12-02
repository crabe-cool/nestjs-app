import { AnswerThreadCommand } from '../application/commands/answer-thread.handler';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllThreadsQuery } from '../application/queries/get-all-threads.handler';
import { Message } from '../domain/message';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessageDTO } from './DTO/message.dto';
import { Logger, OnModuleInit } from '@nestjs/common';
import { PostThreadCommand } from '../application/commands/post-thread.handler';
import { ReceivedMessageDTO } from './DTO/received-message.dto';
import { ReceivedThreadDTO } from './DTO/received-thread.dto';
import { Server, Socket } from 'socket.io';
import { Thread } from '../domain/thread';
import { ThreadDTO } from './DTO/thread.dto';

@WebSocketGateway({ cors: true })
export class ThreadGateway implements OnModuleInit {
    private readonly logger = new Logger(ThreadGateway.name);
    
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    onModuleInit() {
        this.server.on('connection', async (socket: Socket) => {
            this.logger.verbose(`Socket "${socket.id}" connected`);
            
            const query = new GetAllThreadsQuery();
            const threads = await this.queryBus.execute<
                GetAllThreadsQuery,
                Thread[]
            >(query);

            socket.emit('onConnect', this.toDTOs(threads));
        });
    }

    @SubscribeMessage('postThread')
    async handlePostThreadEvent(
        @MessageBody() { author, text, title }: ReceivedThreadDTO,
    ): Promise<void> {
        this.logger.verbose(`postThread event triggered`);

        const thread = new Thread(author, new Date(), text, title);

        const command = new PostThreadCommand(thread);
        const created = await this.commandBus.execute<
            PostThreadCommand,
            Thread
        >(command);

        this.server.emit('onPostedThread', this.toDTO(created));
    }

    @SubscribeMessage('answerThread')
    async handleAnswerThreadEvent(
        @MessageBody() { threadId, author, text }: ReceivedMessageDTO,
    ): Promise<void> {
        this.logger.verbose(`answerThread event triggered`);

        const message = new Message(author, new Date(), text);

        const command = new AnswerThreadCommand(threadId, message);
        const updated = await this.commandBus.execute<
            AnswerThreadCommand,
            Thread
        >(command);

        this.server.emit('onAnsweredThread', this.toDTO(updated));
    }

    private toDTOs(threads: Thread[]): ThreadDTO[] {
        return threads.map((thread) => this.toDTO(thread));
    }

    private toDTO(thread: Thread): ThreadDTO {
        return new ThreadDTO(
            thread.id,
            thread.author,
            thread.title,
            thread.text,
            thread.postingDate,
            thread.messages.map(
                (message) =>
                    new MessageDTO(
                        message.author,
                        message.text,
                        message.postingDate,
                    ),
            ),
        );
    }
}
