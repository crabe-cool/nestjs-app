import { createMock } from 'ts-auto-mock';
import { IThreadRepository } from '../thread-repository.interface';
import { PostThreadCommand, PostThreadHandler } from './post-thread.handler';
import { Thread } from '../../domain/thread';

describe('PostThreadHandler', () => {
    let sut: PostThreadHandler;
    let threadRepository: IThreadRepository;

    const now = new Date();

    beforeEach(() => {
        threadRepository = createMock<IThreadRepository>();
        sut = new PostThreadHandler(threadRepository);
    });

    describe('execute', () => {
        it('should call post on threadRepository with given thread', async () => {
            const thread = new Thread('author', now, 'text', 'title');
            const postThreadCommand = new PostThreadCommand(thread);

            await sut.execute(postThreadCommand);

            expect(threadRepository.post).toBeCalledWith(thread);
        });
    });
});
