import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DummyDocument extends Document {
    @Prop()
    name: string;
}

export type DummyEntity = DummyDocument & Document;

export const dummySchema = SchemaFactory.createForClass(DummyDocument);
