import { IApplicationConfiguration } from './model/application-configuration';
import { IDatabaseConfiguration } from './model/database-configuration';

export interface IConfigurationService {
    application: IApplicationConfiguration;
    database: IDatabaseConfiguration;
    hasBeenSetup: boolean;
    setup(): void;
}
