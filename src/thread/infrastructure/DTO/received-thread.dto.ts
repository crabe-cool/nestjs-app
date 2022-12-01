import { IsString } from 'class-validator';

export class ReceivedThreadDTO {
    @IsString()
    readonly author: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly text: string;
}
