import { DummyRepositoryImplement } from './dummy-repository.implement';
import { Provider } from '@nestjs/common';

export const DummyRepositoryProvider: Provider = {
    provide: 'DummyRepository',
    useClass: DummyRepositoryImplement,
};
