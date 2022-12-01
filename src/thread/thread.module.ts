import { AnswerThreadHandler } from './application/commands/answer-thread.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostThreadHandler } from './application/commands/post-thread.handler';
import { ThreadRepositoryProvider } from './persistence/thread-repository.provider';
import { ThreadSagas } from './events/thread.sagas';
import { threadSchema } from './persistence/thread-entity';

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{ name: 'Thread', schema: threadSchema }]),
    ],
    providers: [
        AnswerThreadHandler,
        PostThreadHandler,
        ThreadRepositoryProvider,
        ThreadSagas,
    ],
})
export class ThreadModule {}
