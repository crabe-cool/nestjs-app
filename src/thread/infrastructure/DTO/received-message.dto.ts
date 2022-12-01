import { IsString } from 'class-validator';

export class ReceivedMessageDTO {
    @IsString()
    readonly threadId: string;

    @IsString()
    readonly author: string;

    @IsString()
    readonly text: string;
}
