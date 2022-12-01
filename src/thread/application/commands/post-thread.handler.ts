import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IThreadRepository } from '../thread-repository.interface';
import { Thread } from 'src/thread/domain/thread';

export class PostThreadCommand implements ICommand {
    constructor(readonly thread: Thread) {}
}

@CommandHandler(PostThreadCommand)
export class PostThreadHandler implements ICommandHandler<PostThreadCommand> {
    constructor(
        @Inject('ThreadRepository')
        private readonly threadRepository: IThreadRepository,
    ) {}

    execute({ thread }: PostThreadCommand): Promise<Thread> {
        return this.threadRepository.post(thread);
    }
}
