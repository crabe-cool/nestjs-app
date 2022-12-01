import { IEvent } from '@nestjs/cqrs';
import { Thread } from '../domain/thread';

export class ThreadReceivedEvent implements IEvent {
    constructor(readonly thread: Thread) {}
}
