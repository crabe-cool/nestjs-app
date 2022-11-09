import { ConfigService } from '@nestjs/config';
import { ConfigurationServiceImplement } from './configuration-service.implement';
import { createMock } from 'ts-auto-mock';
import { Environment } from './model/environment';
import { Method, method, On } from 'ts-auto-mock/extension';
import { when } from 'jest-when';

describe('ConfigurationServiceImplement', () => {
    let sut: ConfigurationServiceImplement;
    let nestConfigService: ConfigService;

    beforeEach(() => {
        nestConfigService = createMock<ConfigService>();
        sut = new ConfigurationServiceImplement(nestConfigService);
    });

    describe('setup', () => {
        it('should throw an error if at least one required app environment variable is not set', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(undefined);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('appUrl');

            when(nestConfigServiceGet)
                .calledWith('APP_UNDER_TEST')
                .mockReturnValue('any truthy value');

            expect(() => sut.setup()).toThrowError();
        });

        it('should retrieve all app environment variables from ApplicationConfiguration', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            const appEnv = Environment.Production;
            const appUrl = 'http://host:port';

            mockRequiredDbEnvVariables(appEnv, nestConfigServiceGet);

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(appEnv);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue(appUrl);

            when(nestConfigServiceGet)
                .calledWith('APP_UNDER_TEST')
                .mockReturnValue('any truthy value');

            sut.setup();

            expect(sut.application.APP_ENV).toEqual(appEnv);
            expect(sut.application.APP_URL).toEqual(appUrl);
            expect(sut.application.isUnderTest).toEqual(true);
            expect(sut.hasBeenSetup).toBe(true);
        });

        it('should give application the right environment state when given the right input', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(Environment.Development);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('APP_UNDER_TEST')
                .mockReturnValue('true');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DBNAME')
                .mockReturnValue('mongodbDbName');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DEV_URI')
                .mockReturnValue('mongodbDevUri');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_TESTING_DBNAME')
                .mockReturnValue('mongodbTestingDbName');

            sut.setup();

            expect(sut.application.isEnvDev).toEqual(true);
            expect(sut.hasBeenSetup).toBe(true);
        });

        it('should retrieve only dev database environment variables from DatabaseConfiguration when given env is DEV', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            const mongoDbDevUri = 'mongoDbDevUri';
            const mongoDbDbName = 'mongoDbDbName';

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(Environment.Development);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DEV_URI')
                .mockReturnValue(mongoDbDevUri);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DBNAME')
                .mockReturnValue(mongoDbDbName);

            sut.setup();

            expect(sut.database.MONGODB_DEV_URI).toEqual(mongoDbDevUri);
            expect(sut.database.MONGODB_DBNAME).toEqual(mongoDbDbName);
            expect(sut.database.MONGODB_URI).toBeUndefined();
            expect(sut.database.MONGODB_USER).toBeUndefined();
            expect(sut.database.MONGODB_PASSWORD).toBeUndefined();
            expect(sut.hasBeenSetup).toBe(true);
        });

        it('should retrieve only database cluster environment variables from DatabaseConfiguration when given any other env than DEV', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            const mongoDbUri = 'mongoDbDevUri';
            const mongoDbDbName = 'mongoDbDbName';
            const mongoDbUser = 'mongoDbUser';
            const mongoDbPassword = 'mongoDbPassword';

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(Environment.Production);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_URI')
                .mockReturnValue(mongoDbUri);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DBNAME')
                .mockReturnValue(mongoDbDbName);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_USER')
                .mockReturnValue(mongoDbUser);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_PASSWORD')
                .mockReturnValue(mongoDbPassword);

            sut.setup();

            expect(sut.database.MONGODB_DBNAME).toEqual(mongoDbDbName);
            expect(sut.database.MONGODB_URI).toBe(mongoDbUri);
            expect(sut.database.MONGODB_USER).toBe(mongoDbUser);
            expect(sut.database.MONGODB_PASSWORD).toBe(mongoDbPassword);
            expect(sut.database.MONGODB_DEV_URI).toBeUndefined();
            expect(sut.hasBeenSetup).toBe(true);
        });

        it('should retrieve testing db name from DatabaseConfiguration only when app is under test', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            const appEnv = Environment.Production;
            const mongoDbTestingDbName = 'mongoDbTestingDbName';

            mockRequiredDbEnvVariables(appEnv, nestConfigServiceGet);

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(appEnv);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('APP_UNDER_TEST')
                .mockReturnValue('any truthy value');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_TESTING_DBNAME')
                .mockReturnValue(mongoDbTestingDbName);

            sut.setup();

            expect(sut.database.MONGODB_TESTING_DBNAME).toBe(
                mongoDbTestingDbName,
            );
            expect(sut.hasBeenSetup).toBe(true);
        });

        it('should not retrieve testing db name from DatabaseConfiguration when app is not under test', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            const appEnv = Environment.Development;
            const mongoDbTestingDbName = 'mongoDbTestingDbName';

            mockRequiredDbEnvVariables(appEnv, nestConfigServiceGet);

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(appEnv);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('APP_UNDER_TEST')
                .mockReturnValue(undefined);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_TESTING_DBNAME')
                .mockReturnValue(mongoDbTestingDbName);

            sut.setup();

            expect(sut.database.MONGODB_TESTING_DBNAME).toBeUndefined();
            expect(sut.hasBeenSetup).toBe(true);
        });

        it('should throw an error if at least one required dev db environment variable is not set', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(Environment.Development);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DEV_URI')
                .mockReturnValue(undefined);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DBNAME')
                .mockReturnValue('mongoDbDbName');

            expect(() => sut.setup()).toThrowError();
        });

        it('should throw an error if at least one required prod db environment variable is not set', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue(Environment.Production);

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_URI')
                .mockReturnValue(undefined);

            when(nestConfigServiceGet)
                .calledWith('MONGODB_USER')
                .mockReturnValue('user');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_PASSWORD')
                .mockReturnValue('password');

            when(nestConfigServiceGet)
                .calledWith('MONGODB_DBNAME')
                .mockReturnValue('mongoDbDbName');

            expect(() => sut.setup()).toThrowError();
        });
    });
});

function mockRequiredDbEnvVariables(
    environment: Environment,
    nestConfigServiceGet: Method<unknown>,
): void {
    if (environment === Environment.Development) {
        when(nestConfigServiceGet)
            .calledWith('MONGODB_DEV_URI')
            .mockReturnValue('mongoDbDevUri');

        when(nestConfigServiceGet)
            .calledWith('MONGODB_DBNAME')
            .mockReturnValue('mongoDbDbName');
    } else {
        when(nestConfigServiceGet)
            .calledWith('MONGODB_URI')
            .mockReturnValue('mongoDbUri');

        when(nestConfigServiceGet)
            .calledWith('MONGODB_USER')
            .mockReturnValue('mongoDbUser');

        when(nestConfigServiceGet)
            .calledWith('MONGODB_PASSWORD')
            .mockReturnValue('mongoDbPassword');

        when(nestConfigServiceGet)
            .calledWith('MONGODB_DBNAME')
            .mockReturnValue('mongoDbDbName');
    }
}
