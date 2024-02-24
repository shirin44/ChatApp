import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/schema/account.schema';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.services';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
