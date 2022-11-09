import { createMock } from 'ts-auto-mock';
import { DummyController } from './dummy-controller';
import { IDummyRepository } from '../application/dummy-repository.interface';

describe('DummyController', () => {
    let sut: DummyController;
    let dummyRepository: IDummyRepository;

    beforeEach(() => {
        dummyRepository = createMock<IDummyRepository>();
        sut = new DummyController(dummyRepository);
    });

    describe('method', () => {
        it('should call method on dummyRepository', async () => {
            await sut.method();

            expect(dummyRepository.method).toHaveBeenCalled();
        });
    });
});
