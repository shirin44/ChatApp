import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chat.module/chats.module';
import { RouterModule, Routes } from '@nestjs/core';

const routes: Routes = [
  {
    path: '/chat',
    module: ChatsModule
  }
]

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shirin'),
    RouterModule.register(routes),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
