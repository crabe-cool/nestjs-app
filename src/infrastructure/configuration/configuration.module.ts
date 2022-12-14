import { ConfigModule } from '@nestjs/config';
import { ConfigurationServiceProvider } from './configuration-service.provider';
import { Module } from '@nestjs/common';

@Module({
    exports: [ConfigurationServiceProvider],
    imports: [ConfigModule.forRoot()],
    providers: [ConfigurationServiceProvider],
})
export class ConfigurationModule {}
