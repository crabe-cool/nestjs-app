import { DbHelper } from './helper/database-helper';
import {
    IConfigurationService,
    IDatabaseApplicationConfiguration,
} from './configuration-service.interface';
import { IDatabaseService } from './database-service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseServiceImplement implements IDatabaseService {
    constructor(
        @Inject('ConfigurationService')
        private readonly configurationService: IConfigurationService,
    ) {
        const { hasBeenSetup } = this.configurationService;
        if (!hasBeenSetup) {
            this.configurationService.setup();
        }
    }

    get connectionString(): string {
        const { application } = this.configurationService;
        const dbName = this.computeDbName(application);
        return this.computeConnectionString(application, dbName);
    }

    private computeDbName({
        isUnderTest,
    }: IDatabaseApplicationConfiguration): string {
        return isUnderTest
            ? this.configurationService.database.MONGODB_TESTING_DBNAME
            : this.configurationService.database.MONGODB_DBNAME;
    }

    private computeConnectionString(
        { isEnvDev }: IDatabaseApplicationConfiguration,
        dbName: string,
    ): string {
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
