import { Provider } from '@nestjs/common';
import { DatabaseServiceImplement } from './database-service.implement';

export const DatabaseServiceProvider: Provider = {
    provide: 'DatabaseService',
    useClass: DatabaseServiceImplement,
};
