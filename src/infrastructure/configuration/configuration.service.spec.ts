import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';
import { when } from 'jest-when';

describe('ConfigurationService', () => {
    let sut: ConfigurationService;
    let nestConfigService: ConfigService;

    beforeEach(() => {
        nestConfigService = createMock<ConfigService>();
        sut = new ConfigurationService(nestConfigService);
    });

    describe('setup', () => {
        it('should throw an error if at least one required environment variable is not set', () => {
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

        it('should retrieve all basic app configuration environment variables', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            const appEnv = 'development';
            const appUrl = 'http://host:port';

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
        });

        it('should give application the right environment state when given a matching input', () => {
            const nestConfigServiceGet = On(nestConfigService).get(
                method('get'),
            );

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue('DEV');

            when(nestConfigServiceGet)
                .calledWith('APP_URL')
                .mockReturnValue('http://host:port');

            when(nestConfigServiceGet)
                .calledWith('APP_UNDER_TEST')
                .mockReturnValue('true');

            sut.setup();
            expect(sut.application.isEnvDev).toEqual(true);

            when(nestConfigServiceGet)
                .calledWith('APP_ENV')
                .mockReturnValue('PROD');

            sut.setup();
            expect(sut.application.isEnvProduction).toEqual(true);
        });
    });
});
