import { DummyController } from './presentation/dummy-controller';
import { DummyRepositoryProvider } from './persistence/dummy-repository.provider';
import { dummySchema } from './persistence/dummy-entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [DummyController],
    imports: [
        MongooseModule.forFeature([{ name: 'Dummy', schema: dummySchema }]),
    ],
    providers: [DummyRepositoryProvider],
})
export class DummyModule {}
