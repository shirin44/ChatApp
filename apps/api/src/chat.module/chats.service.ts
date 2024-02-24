import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from 'src/schema/chat.schema';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(createChatDto: any): Promise<Chat> {

    console.log('chat', this.chatModel)
    const createdChat = new this.chatModel(createChatDto);

    console.log('chat', createdChat)
    
    const result = await createdChat.save();

    return result;
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }
}
