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

        it('should return any filled database URI with testing db name when app is under test', () => {
            const mongoDevDbUri = '<dbname>';
            const mongoDbTestingDbName = 'test';

            configurationService.application.isEnvDev = true;
            configurationService.application.isUnderTest = true;
            configurationService.database.MONGODB_DEV_URI = mongoDevDbUri;
            configurationService.database.MONGODB_TESTING_DBNAME =
                mongoDbTestingDbName;

            const result = sut.connectionString;

            expect(result).toBe(mongoDbTestingDbName);
        });
    });
});
