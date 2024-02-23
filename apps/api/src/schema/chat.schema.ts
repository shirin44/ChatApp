
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ChatDocument = HydratedDocument<Chat>;
@Schema()
export class Chat {
    @Prop()
    senderName: string;
  
    @Prop()
    senderIcon: string;
  
    @Prop()
    content: string;
  
    @Prop({  default: Date.now })
    timestamp: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
