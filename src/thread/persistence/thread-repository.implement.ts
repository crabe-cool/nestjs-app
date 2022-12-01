import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IThreadRepository } from '../application/thread-repository.interface';
import { Model } from 'mongoose';
import { Thread } from '../domain/thread';
import { ThreadEntity } from './thread-entity';

@Injectable()
export class ThreadRepositoryImplement implements IThreadRepository {
    constructor(
        @InjectModel('Thread')
        private readonly threadModel: Model<ThreadEntity>,
    ) {}

    async getAll(): Promise<Thread[]> {
        const results = await this.threadModel.find({});
        return results.map(
            (result) =>
                new Thread(
                    result.author,
                    result.postingDate,
                    result.text,
                    result.title,
                    result.messages,
                    result._id,
                ),
        );
    }

    async getById(id: string): Promise<Thread | undefined> {
        const result = await this.threadModel.findById(id);
        if (!result) {
            return;
        }

        return new Thread(
            result.author,
            result.postingDate,
            result.text,
            result.title,
            result.messages,
            result._id,
        );
    }

    async post(thread: Thread): Promise<Thread> {
        const created = await this.threadModel.create(thread);
        return new Thread(
            created.author,
            created.postingDate,
            created.text,
            created.title,
            created.messages,
            created._id,
        );
    }

    async updateMessages({ id, messages }: Thread): Promise<Thread> {
        await this.threadModel.findByIdAndUpdate(id, {
            messages,
        });

        return this.getById(id);
    }
}
