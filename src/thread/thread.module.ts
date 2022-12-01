import { AnswerThreadHandler } from './application/commands/answer-thread.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllThreadsHandler } from './application/queries/get-all-threads.handler';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostThreadHandler } from './application/commands/post-thread.handler';
import { ThreadGateway } from './infrastructure/thread-gateway';
import { ThreadRepositoryProvider } from './persistence/thread-repository.provider';
import { threadSchema } from './persistence/thread-entity';

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{ name: 'Thread', schema: threadSchema }]),
    ],
    providers: [
        AnswerThreadHandler,
        GetAllThreadsHandler,
        PostThreadHandler,
        ThreadGateway,
        ThreadRepositoryProvider,
    ],
})
export class ThreadModule {}
