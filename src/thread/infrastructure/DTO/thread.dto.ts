import { MessageDTO } from './message.dto';

export class ThreadDTO {
    constructor(
        readonly id: string,
        readonly author: string,
        readonly title: string,
        readonly text: string,
        readonly postingDate: Date,
        readonly messages: MessageDTO[],
    ) {}
}
