import { Injectable } from '@angular/core';
import Ledgerkeep from 'ledgerkeep-client';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerkeepService {
  private client: Ledgerkeep;

  constructor(private conf: ConfigService, private auth: AuthService) {
    const configs = this.conf.get();

    this.client = new Ledgerkeep(configs.api.ledgerkeep);
  }

  public async getTransactionSum(queries: any): Promise<any> {
    const token = this.auth.getToken();
    try {
      return await this.client.getTransactionSum(token, queries);
    } catch (err) {
      throw this.handleError(err, {});
    }
  }

  public async getTransactionCount(queries: any): Promise<any> {
    const token = this.auth.getToken();
    try {
      return await this.client.getTransactionCount(token, queries);
    } catch (err) {
      throw this.handleError(err, {});
    }
  }

  public async getCategoryCount(): Promise<any> {
    const token = this.auth.getToken();
    try {
      return await this.client.getCategoryCount(token);
    } catch (err) {
      throw this.handleError(err, {});
    }
  }

  private handleError(err: Error, code2Message: { [key: string]: string }): Error {
    const message = code2Message[err.message];
    if (message) {
      return new Error(message);
    }

    if (err.message === 'TOKEN_EXPIRED') {
      this.auth.logout();
      return new Error('Your session has expired.');
    }
    console.warn('Unexpected error from backend:', err.message);
    return new Error('Please try again later.');
  }
}
