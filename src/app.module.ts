import { DatabaseModule } from './infrastructure/database/database.module';
import { DatabaseServiceProviderToken } from './infrastructure/database/database-service.provider';
import { IDatabaseService } from './infrastructure/database/database-service.interface';
import { Module } from '@nestjs/common';
import {
    MongooseModule,
    MongooseModuleFactoryOptions,
    MongooseModuleOptions,
} from '@nestjs/mongoose';

@Module({
    imports: [
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
    ],
})
export class AppModule {}
