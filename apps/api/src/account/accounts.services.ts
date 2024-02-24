import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/schema/account.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async create(createAccountDto: any): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }
}
