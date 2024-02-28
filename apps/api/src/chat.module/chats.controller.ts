import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  hello(): string {
    return 'Hello chat';
  }
  @Get(':userId')
  getAllChats(@Param('userId')userId: string): Promise<any[]> {
    return this.chatsService.getChatByUserId(userId);
  }
  

  @Get('/bye')
  sayGoodBy(): string {
    return 'Bye bye chat';
  }

  @Post()
  create(@Body() request: any): any {
    return this.chatsService.create(request)
  }
}
