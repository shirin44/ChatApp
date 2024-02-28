
import { Account } from "../app/register/page";
import httpClient from "../util/http.client";

export const getAllAccounts = async (): Promise<Account[]> => {
  return await httpClient('accounts', {
    method: 'GET'
  });
}

export const createAccount = async (account: Account): Promise<string> => {
  return await httpClient('accounts', {
    method: 'POST',
    data: account
  });
}

export const login = async (account: any): Promise<string> => {
  return await httpClient('accounts/login', {
    method: 'POST',
    data: account
  });
}
