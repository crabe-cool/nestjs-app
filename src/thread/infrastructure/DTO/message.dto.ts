export class MessageDTO {
    constructor(
        readonly author: string,
        readonly text: string,
        readonly postingDate: Date,
    ) {}
}
