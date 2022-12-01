import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

class ReceivedMessage {
    constructor(readonly content: string) {}
}

class PostedMessage extends ReceivedMessage {
    constructor(readonly content: string, readonly postingDate: Date) {
        super(content);
    }
}

@WebSocketGateway()
export class MessagesGateway implements OnModuleInit {
    private postedMessages: Array<PostedMessage> = [];

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket: Socket) => {
            console.log(socket.id, 'connected');
            socket.emit('onConnect', this.postedMessages);
        });
    }

    @SubscribeMessage('newMessage')
    handleMessageEvent(@MessageBody() data: ReceivedMessage): void {
        const postedMessage = new PostedMessage(data.content, new Date());
        this.postedMessages.push(postedMessage);

        this.server.emit('onMessage', postedMessage);
    }
}
