
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes } from 'mongoose';
export type ChatDocument = HydratedDocument<Chat>;
@Schema()
export class Chat {

    @Prop()
    id: string;

    @Prop({type: SchemaTypes.Mixed})
    sender: {
      name: string;
      icon: string;
    };
  
    @Prop()
    content: string;

    @Prop()
    receiverId: string;
    
    @Prop()
    senderId: string;
  
    @Prop({ default: Date.now })
    timestamp: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
