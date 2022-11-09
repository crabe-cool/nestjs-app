import { DbHelper } from './database-helper';
import { IConfigurationService } from './configuration-service.interface';
import { IDatabaseService } from './database-service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseServiceImplement implements IDatabaseService {
    constructor(
        @Inject('ConfigurationService')
        private readonly configurationService: IConfigurationService,
    ) {}

    get connectionString(): string {
        if (this.configurationService.application.isEnvDev) {
            const { MONGODB_DEV_URI, MONGODB_DBNAME } =
                this.configurationService.database;

            return DbHelper.replace(MONGODB_DEV_URI, {
                placeholder: '<dbname>',
                newValue: MONGODB_DBNAME,
            });
        }

        const { MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD, MONGODB_DBNAME } =
            this.configurationService.database;

        return DbHelper.replace(
            MONGODB_URI,
            { placeholder: '<user>', newValue: MONGODB_USER },
            { placeholder: '<password>', newValue: MONGODB_PASSWORD },
            { placeholder: '<dbname>', newValue: MONGODB_DBNAME },
        );
    }
}
