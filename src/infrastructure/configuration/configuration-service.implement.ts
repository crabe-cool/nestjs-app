import {
    ApplicationConfiguration,
    IApplicationConfiguration,
} from './model/application-configuration';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './model/configuration';
import {
    DatabaseConfiguration,
    IDatabaseConfiguration,
} from './model/database-configuration';
import { IConfiguration } from './model/configuration.interface';
import { IConfigurationService } from './configuration-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationServiceImplement implements IConfigurationService {
    private readonly configuration: IConfiguration;
    private _hasBeenSetup = false;

    get application(): IApplicationConfiguration {
        return this.configuration.application;
    }

    get database(): IDatabaseConfiguration {
        return this.configuration.database;
    }

    get hasBeenSetup(): boolean {
        return this._hasBeenSetup;
    }

    constructor(private readonly nestConfigService: ConfigService) {
        this.configuration = new Configuration(
            new ApplicationConfiguration(),
            new DatabaseConfiguration(),
        );
    }

    setup(): void {
        this.application.APP_ENV =
            this.nestConfigService.get<string>('APP_ENV');

        this.application.APP_URL =
            this.nestConfigService.get<string>('APP_URL');

        this.application.isUnderTest = new Boolean(
            this.nestConfigService.get<string>('APP_UNDER_TEST'),
        ).valueOf();

        this.database.MONGODB_DBNAME =
            this.nestConfigService.get<string>('MONGODB_DBNAME');

        if (this.application.isEnvDev) {
            this.database.MONGODB_DEV_URI =
                this.nestConfigService.get<string>('MONGODB_DEV_URI');
        } else {
            this.database.MONGODB_URI =
                this.nestConfigService.get<string>('MONGODB_URI');

            this.database.MONGODB_USER =
                this.nestConfigService.get<string>('MONGODB_USER');

            this.database.MONGODB_PASSWORD =
                this.nestConfigService.get<string>('MONGODB_PASSWORD');
        }

        if (this.application.isUnderTest) {
            this.database.MONGODB_TESTING_DBNAME =
                this.nestConfigService.get<string>('MONGODB_TESTING_DBNAME');
        }

        if (!this.areAppEnvVariablesSet() || !this.areDbEnvVariablesSet()) {
            throw new Error(
                'One or more required environment variables are not set.',
            );
        }

        this.markAsSetup();
    }

    private areAppEnvVariablesSet(): boolean {
        return new Boolean(
            this.application.APP_ENV && this.application.APP_URL,
        ).valueOf();
    }

    private areDbEnvVariablesSet(): boolean {
        if (this.application.isEnvDev) {
            return new Boolean(
                this.database.MONGODB_DEV_URI && this.database.MONGODB_DBNAME,
            ).valueOf();
        }

        return new Boolean(
            this.database.MONGODB_URI &&
                this.database.MONGODB_USER &&
                this.database.MONGODB_PASSWORD &&
                this.database.MONGODB_DBNAME,
        ).valueOf();
    }

    private markAsSetup(): void {
        this._hasBeenSetup = true;
    }
}
