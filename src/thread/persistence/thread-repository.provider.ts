import { Provider } from '@nestjs/common';
import { ThreadRepositoryImplement } from './thread-repository.implement';

export const ThreadRepositoryProvider: Provider = {
    provide: 'ThreadRepository',
    useClass: ThreadRepositoryImplement,
};
