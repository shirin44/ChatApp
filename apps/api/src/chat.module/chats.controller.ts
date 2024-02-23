import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  hello(): string {
    return 'Hello chat';
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
