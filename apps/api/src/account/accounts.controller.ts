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
  // @Post('login')
  // async login(@Body() credentials: any, @Res() res: Response): Promise<void> {
  //   const { username, password } = credentials;
  //   const isValid = await this.accountsService.validateUser(username, password);
  //   if (isValid) {
  //     res.redirect('/chat'); // Redirect to chat page upon successful login
  //   } else {
  //     res.status(401).send('Invalid username or password'); // Return error if credentials are invalid
  //   }
  // }
}
