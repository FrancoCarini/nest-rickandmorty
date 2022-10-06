import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rickandmorty extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  number: number;
}

export const RickandmortySchema = SchemaFactory.createForClass(Rickandmorty);
