import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/schema/account.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: any): Promise<Account> {
    const { username, password } = createAccountDto;

    // Check if username already exists
    const existingUser = await this.accountModel.findOne({ username }).exec();

    if (existingUser) {
      // Username already exists, throw ConflictException with custom message
      throw new ConflictException('Sorry, this username is taken.');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // If username is unique, proceed with account creation
    const createdAccount = new this.accountModel({
      ...createAccountDto,
      password: hashedPassword,
    });
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async login(request: {
    username: string;
    password: string;
  }): Promise<{ valid: boolean; token: string, account: any }> {
    const account = (await this.accountModel
      .findOne({
        username: request?.username,
      })
      .lean()
      .exec()) as any;

    if (!account?._id) {
      return {
        valid: false,
        token: null,
        account: null
      };
    }

    const comparePassword = bcrypt.compareSync(request?.password, account?.password);

    console.log('comparePassword ', comparePassword)

    if(!comparePassword) {
      return {
        valid: false,
        token: null,
        account: null
      };
    }

    const token = jwt.sign(
      {
        _id: account?._id,
        username: account?.username,
        password: account?.password,
        phoneNumber: account?.phoneNumber,
        profileImageUrl :account?.profileImageUrl,
      },
      'e7750ccb-25d8-4829-9bf1-530403d331a7',
      { expiresIn: 86400 },
    );

   

    const response = {
      account: {
        _id: account?._id,
        username: account?.username,
        password: account?.password,
        phoneNumber: account?.phoneNumber,
        profileImageUrl :account?.profileImageUrl,
      },
      valid: true,
      token: token,
    };

    console.log('response', JSON.stringify({
      _id: account?._id,
      username: account?.username,
      password: account?.password,
      phoneNumber: account?.phoneNumber,
      profileImageUrl :account?.profileImageUrl,
    }))

    return response;
  }
}
