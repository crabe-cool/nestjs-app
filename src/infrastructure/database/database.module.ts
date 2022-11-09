import { ConfigurationModule } from '../configuration/configuration.module';
import { DatabaseServiceProvider } from './database-service.provider';
import { Module } from '@nestjs/common';

@Module({
    exports: [DatabaseServiceProvider],
    imports: [ConfigurationModule],
    providers: [DatabaseServiceProvider],
})
export class DatabaseModule {}
