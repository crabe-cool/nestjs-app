import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IThreadRepository } from '../thread-repository.interface';
import { Message } from 'src/thread/domain/message';

export class AnswerThreadCommand implements ICommand {
    constructor(readonly threadId: string, readonly message: Message) {}
}

@CommandHandler(AnswerThreadCommand)
export class AnswerThreadHandler
    implements ICommandHandler<AnswerThreadCommand>
{
    constructor(
        @Inject('ThreadRepository')
        private readonly threadRepository: IThreadRepository,
    ) {}

    async execute({ threadId, message }: AnswerThreadCommand): Promise<void> {
        const thread = await this.threadRepository.getById(threadId);
        if (!thread) {
            return;
        }

        thread.assignId(threadId);
        thread.answer(message);

        await this.threadRepository.updateMessages(thread);
    }
}
