import { IMessage } from './message.interface';

export class Message implements IMessage {
    constructor(
        readonly author: string,
        readonly postingDate: Date,
        readonly text: string,
    ) {}
}
