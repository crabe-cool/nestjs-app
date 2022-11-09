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
        const { MONGODB_DBNAME } = this.configurationService.database;
        const { isEnvDev, isUnderTest } = this.configurationService.application;

        let dbName = MONGODB_DBNAME;
        if (isUnderTest) {
            const { MONGODB_TESTING_DBNAME } =
                this.configurationService.database;
            dbName = MONGODB_TESTING_DBNAME;
        }

        if (isEnvDev) {
            const { MONGODB_DEV_URI } = this.configurationService.database;

            return DbHelper.replace(MONGODB_DEV_URI, {
                placeholder: '<dbname>',
                newValue: dbName,
            });
        }

        const { MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD } =
            this.configurationService.database;

        return DbHelper.replace(
            MONGODB_URI,
            { placeholder: '<user>', newValue: MONGODB_USER },
            { placeholder: '<password>', newValue: MONGODB_PASSWORD },
            { placeholder: '<dbname>', newValue: dbName },
        );
    }
}
