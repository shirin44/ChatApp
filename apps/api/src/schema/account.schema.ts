
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes } from 'mongoose';
export type AccountDocument = HydratedDocument<Account>;
@Schema()
export class Account {

    @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, validate: /^[0-9]+$/, message: 'Please enter a valid phone number!' })
  phoneNumber: string;

  @Prop({ default: false })
  remember: boolean;

  // Add any other fields you need for your account here

  // Timestamps for created and updated at
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date; 
}

export const AccountSchema = SchemaFactory.createForClass(Account);
