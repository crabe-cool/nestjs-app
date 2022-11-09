import { IApplicationConfiguration } from './application-configuration';
import { IConfiguration } from './configuration.interface';
import { IDatabaseConfiguration } from './database-configuration';

export class Configuration implements IConfiguration {
    constructor(
        readonly application: IApplicationConfiguration,
        readonly database: IDatabaseConfiguration,
    ) {}
}
