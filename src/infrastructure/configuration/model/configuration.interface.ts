import { IApplicationConfiguration } from './application-configuration';
import { IDatabaseConfiguration } from './database-configuration';

export interface IConfiguration {
    application: IApplicationConfiguration;
    database: IDatabaseConfiguration;
}
