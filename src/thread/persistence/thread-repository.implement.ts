import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IThreadRepository } from '../application/thread-repository.interface';
import { Message } from '../domain/message';
import { Model } from 'mongoose';
import { Thread } from '../domain/thread';
import { ThreadEntity } from './thread-entity';

@Injectable()
export class ThreadRepositoryImplement implements IThreadRepository {
    constructor(
        @InjectModel('Thread')
        private readonly threadModel: Model<ThreadEntity>,
    ) {}

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

    async post(thread: Thread): Promise<void> {
        await this.threadModel.create(thread);
    }

    async updateMessages({ id, messages }: Thread): Promise<void> {
        await this.threadModel.findByIdAndUpdate(id, {
            messages,
        });
    }
}
