import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface IPersistedMessage {
    author: string;
    text: string;
    postingDate: Date;
}

@Schema()
export class MessageDocument extends Document implements IPersistedMessage {
    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    postingDate: Date;
}

export const messageSchema = SchemaFactory.createForClass(MessageDocument);

@Schema()
export class ThreadDocument extends Document implements IPersistedMessage {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    postingDate: Date;

    @Prop({ schema: messageSchema })
    messages: IPersistedMessage[];
}

export type ThreadEntity = ThreadDocument & Document;

export const threadSchema = SchemaFactory.createForClass(ThreadDocument);
