import { Provider } from '@nestjs/common';
import { DatabaseServiceImplement } from './database-service.implement';

export const DatabaseServiceProviderToken = 'DatabaseService';

export const DatabaseServiceProvider: Provider = {
    provide: DatabaseServiceProviderToken,
    useClass: DatabaseServiceImplement,
};
