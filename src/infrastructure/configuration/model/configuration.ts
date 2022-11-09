import { IApplicationConfiguration } from './application-configuration';
import { IDatabaseConfiguration } from './database-configuration';

export interface IConfiguration {
    application: IApplicationConfiguration;
    database: IDatabaseConfiguration;
}

export class Configuration implements IConfiguration {
    constructor(
        readonly application: IApplicationConfiguration,
        readonly database: IDatabaseConfiguration,
    ) {}
}
