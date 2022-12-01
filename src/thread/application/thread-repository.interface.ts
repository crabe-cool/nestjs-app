import { Message } from '../domain/message';
import { Thread } from '../domain/thread';

export interface IThreadRepository {
    getById(id: string): Promise<Thread | undefined>;
    post(thread: Thread): Promise<void>;
    updateMessages(thread: Thread): Promise<void>;
}
