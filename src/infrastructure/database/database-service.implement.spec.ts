import { createMock } from 'ts-auto-mock';
import { DatabaseServiceImplement } from './database-service.implement';
import { IConfigurationService } from './configuration-service.interface';

describe('DatabaseServiceImplement', () => {
    let sut: DatabaseServiceImplement;
    let configurationService: IConfigurationService;

    beforeEach(() => {
        configurationService = createMock<IConfigurationService>();
        sut = new DatabaseServiceImplement(configurationService);
    });

    describe('connectionString', () => {
        it('should return filled database dev URI when current env is DEV', () => {
            const mongoDbDevUri = '<dbname>';
            const mongoDbDbName = 'name';

            configurationService.application.isEnvDev = true;
            configurationService.database.MONGODB_DEV_URI = mongoDbDevUri;
            configurationService.database.MONGODB_DBNAME = mongoDbDbName;

            const result = sut.connectionString;

            expect(result).toBe(mongoDbDbName);
        });

        it('should return filled database cluster URI when current env is not DEV', () => {
            const mongoDbUri = '<user>_<password>@<dbname>';
            const mongoDbUser = 'user';
            const mongoDbPassword = 'password';
            const mongoDbName = 'name';

            configurationService.application.isEnvDev = false;
            configurationService.database.MONGODB_URI = mongoDbUri;
            configurationService.database.MONGODB_USER = mongoDbUser;
            configurationService.database.MONGODB_PASSWORD = mongoDbPassword;
            configurationService.database.MONGODB_DBNAME = mongoDbName;

            const result = sut.connectionString;

            expect(result).toBe('user_password@name');
        });
    });
});
