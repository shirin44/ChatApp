import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.services';


@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAllAccounts(): Promise<any[]> {
    return this.accountsService.findAll();
  }

  @Post()
  createAccount(@Body() createAccountDto: any): Promise<any> {
    return this.accountsService.create(createAccountDto);
  }
  @Post('login')
  login(@Body() createAccountDto: any): Promise<boolean> {
    return true as any
  }
}
