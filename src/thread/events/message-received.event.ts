import { IEvent } from '@nestjs/cqrs';
import { Message } from '../domain/message';

export class MessageReceivedEvent implements IEvent {
    constructor(readonly threadId: string, readonly message: Message) {}
}
