import {
    AnswerThreadCommand,
    AnswerThreadHandler,
} from './answer-thread.handler';
import { createMock } from 'ts-auto-mock';
import { IThreadRepository } from '../thread-repository.interface';
import { Message } from '../../domain/message';
import { method, On } from 'ts-auto-mock/extension';
import { Thread } from '../../domain/thread';
import { when } from 'jest-when';

describe('AnswerThreadHandler', () => {
    let sut: AnswerThreadHandler;
    let threadRepository: IThreadRepository;

    const now = new Date();

    beforeEach(() => {
        threadRepository = createMock<IThreadRepository>();
        sut = new AnswerThreadHandler(threadRepository);
    });

    describe('execute', () => {
        it('should not call answer on threadRepository when no thread is found', async () => {
            const threadId = 'not_existing_id';

            const getById = On(threadRepository).get(method('getById'));
            when(getById).calledWith(threadId).mockResolvedValue(undefined);

            const message = new Message('author', now, 'text');
            const command = new AnswerThreadCommand(threadId, message);

            await sut.execute(command);

            expect(threadRepository.getById).toHaveBeenCalledWith(threadId);
            expect(threadRepository.updateMessages).not.toHaveBeenCalled();
        });

        it('should call answer on threadRepository with given thread', async () => {
            const threadId = 'existing_id';
            const thread = createMock<Thread>({
                author: 'author',
                postingDate: now,
                text: 'text',
                title: 'title',
            });

            const getById = On(threadRepository).get(method('getById'));
            when(getById).calledWith(threadId).mockResolvedValue(thread);

            const message = new Message('author', now, 'text');
            const command = new AnswerThreadCommand(threadId, message);

            await sut.execute(command);

            expect(threadRepository.getById).toHaveBeenCalledWith(
                command.threadId,
            );
            expect(thread.assignId).toBeCalledWith(command.threadId);
            expect(thread.answer).toBeCalledWith(command.message);
            expect(threadRepository.updateMessages).toHaveBeenCalledWith(
                thread,
            );
        });
    });
});
