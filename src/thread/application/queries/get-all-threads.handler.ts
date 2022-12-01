import { Inject } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IThreadRepository } from '../thread-repository.interface';
import { Thread } from 'src/thread/domain/thread';

export class GetAllThreadsQuery implements IQuery {}

@QueryHandler(GetAllThreadsQuery)
export class GetAllThreadsHandler implements IQueryHandler<GetAllThreadsQuery> {
    constructor(
        @Inject('ThreadRepository')
        private readonly threadRepository: IThreadRepository,
    ) {}

    async execute(query: GetAllThreadsQuery): Promise<Thread[]> {
        return this.threadRepository.getAll();
    }
}
