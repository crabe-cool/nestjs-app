import { IApplicationConfiguration } from '../configuration/model/application-configuration';
import { IDatabaseConfiguration } from '../configuration/model/database-configuration';

export interface IDatabaseApplicationConfiguration
    extends Pick<IApplicationConfiguration, 'isEnvDev' | 'isUnderTest'> {}

export interface IConfigurationService {
    database: IDatabaseConfiguration;
    application: IDatabaseApplicationConfiguration;
}
