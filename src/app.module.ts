import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './infrastructure/database/database.module';
import { DatabaseServiceProviderToken } from './infrastructure/database/database-service.provider';
import { IDatabaseService } from './infrastructure/database/database-service.interface';
import { Module } from '@nestjs/common';
import {
    MongooseModule,
    MongooseModuleFactoryOptions,
    MongooseModuleOptions,
} from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { ThreadModule } from './thread/thread.module';
import { VersionModule } from './version/version.module';

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forRootAsync({
            imports: [DatabaseModule],
            inject: [DatabaseServiceProviderToken],
            useFactory: (
                databaseService: IDatabaseService,
            ): MongooseModuleFactoryOptions => {
                const options: MongooseModuleOptions = {
                    uri: databaseService.connectionString,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                };
                return options;
            },
        }),
        RouterModule.register([
            {
                path: 'api',
                children: [
                    {
                        path: 'version',
                        module: VersionModule,
                    },
                ],
            },
        ]),
        ThreadModule,
        VersionModule,
    ],
})
export class AppModule {}
