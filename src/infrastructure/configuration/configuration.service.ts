import { ConfigService } from '@nestjs/config';
import { ApplicationConfiguration, Configuration } from './configuration';

export class ConfigurationService {
    private readonly configuration = new Configuration();

    get application(): ApplicationConfiguration {
        return this.configuration.application;
    }

    constructor(private readonly nestConfigService: ConfigService) {}

    setup(): void {
        this.application.APP_ENV =
            this.nestConfigService.get<string>('APP_ENV');

        this.application.APP_URL =
            this.nestConfigService.get<string>('APP_URL');

        this.application.isUnderTest = new Boolean(
            this.nestConfigService.get<string>('APP_UNDER_TEST'),
        ).valueOf();

        if (!this.application.APP_ENV || !this.application.APP_URL) {
            throw new Error(
                'One or more required environment variables are not set.',
            );
        }
    }
}
