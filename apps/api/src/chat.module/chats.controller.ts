import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':currentUserId/:receiverId')
  getAllChats(
    @Param('currentUserId') currentUserId: string,
    @Param('receiverId') receiverId: string,
  ): Promise<any[]> {
    return this.chatsService.getChatByForUser(currentUserId, receiverId);
  }

  @Get('/bye')
  sayGoodBy(): string {
    return 'Bye bye chat';
  }

  @Post()
  create(@Body() request: any): any {
    return this.chatsService.create(request);
  }
}
