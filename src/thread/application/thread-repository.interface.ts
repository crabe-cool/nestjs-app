import { Thread } from '../domain/thread';

export interface IThreadRepository {
    getAll(): Promise<Thread[]>;
    getById(id: string): Promise<Thread | undefined>;
    post(thread: Thread): Promise<Thread>;
    updateMessages(thread: Thread): Promise<Thread>;
}
