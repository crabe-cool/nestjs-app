import { Message } from './message';
import { IThread } from './thread.interface';

export class Thread implements IThread {
    get id(): string {
        return this._id;
    }

    private set id(value: string) {
        this._id = value;
    }

    get messages(): Message[] {
        return this._messages;
    }

    private set messages(value: Message[]) {
        this._messages = value;
    }

    constructor(
        readonly author: string,
        readonly postingDate: Date,
        readonly text: string,
        readonly title: string,
        private _messages?: Message[],
        private _id?: string,
    ) {}

    answer(message: Message): void {
        if (!Array.isArray(this.messages)) {
            this.messages = [];
        }
        this.messages.push(message);
    }

    assignId(id: string): void {
        this.id = id;
    }
}
