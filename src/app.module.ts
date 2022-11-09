import { DatabaseModule } from './infrastructure/database/database.module';
import { DatabaseServiceProviderToken } from './infrastructure/database/database-service.provider';
import { DummyModule } from './dummy/dummy.module';
import { IDatabaseService } from './infrastructure/database/database-service.interface';
import { Module } from '@nestjs/common';
import {
    MongooseModule,
    MongooseModuleFactoryOptions,
    MongooseModuleOptions,
} from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [
        DummyModule,
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
                        path: 'dummy',
                        module: DummyModule,
                    },
                ],
            },
        ]),
    ],
})
export class AppModule {}
