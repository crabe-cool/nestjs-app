import { createMock } from 'ts-auto-mock';
import {
    GetAllThreadsHandler,
    GetAllThreadsQuery,
} from './get-all-threads.handler';
import { IThreadRepository } from '../thread-repository.interface';

describe('GetAllThreadsHandler', () => {
    let sut: GetAllThreadsHandler;
    let threadRepository: IThreadRepository;

    beforeEach(() => {
        threadRepository = createMock<IThreadRepository>();
        sut = new GetAllThreadsHandler(threadRepository);
    });

    describe('execute', () => {
        it('should call getAll on threadRepository', async () => {
            const query = new GetAllThreadsQuery();

            await sut.execute(query);

            expect(threadRepository.getAll).toHaveBeenCalled();
        });
    });
});
