import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ConstantsService } from './constants.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerlensService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private configService: ConfigService,
    private constants: ConstantsService,
  ) {}

  async getUser(token: string): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      return await this.http.get(conf.ledgerlens.user, { headers }).toPromise();
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  async getBalance(token: string): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      const response = (await this.http
        .get(conf.ledgerlens.transactionSum, { headers })
        .toPromise()) as any;
      return response.sum;
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  async getTransactionCount(token: string): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      const response = (await this.http
        .get(conf.ledgerlens.transactionCount, { headers })
        .toPromise()) as any;
      return response.count;
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  async getTransactionSumByCategory(token: string, queries: any = {}): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      return await this.http
        .get(conf.ledgerlens.transactionSumByCategory, { headers, params: queries })
        .toPromise();
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  async getCategoryCount(token: string): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      const response = (await this.http
        .get(conf.ledgerlens.categoryCount, { headers })
        .toPromise()) as any;
      return response.count;
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  async getCategories(token: string): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      return (await this.http.get(conf.ledgerlens.category, { headers }).toPromise()) as any;
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  async getTransactions(token: string, queries: any): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      return (await this.http
        .get(conf.ledgerlens.transaction, { headers, params: queries })
        .toPromise()) as any;
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  private async handleError(
    err: HttpErrorResponse,
    known: { [key: string]: string },
  ): Promise<void> {
    const customCode = err?.error?.custom_code;
    if (!customCode) {
      console.warn('No custom code present in backend response:', err.message);
      throw this.constants.Errors.Default;
    }

    if (customCode === this.constants.CustomCodes.Unauthorized) {
      await this.authService.logout();
      throw this.constants.Errors.PleaseLoginAgain;
    }
    if (customCode === this.constants.CustomCodes.TokenExpired) {
      await this.authService.logout();
      throw this.constants.Errors.SessionExpired;
    }

    const knownErr = known[customCode];
    if (!knownErr) {
      console.warn('Unexpected custom code in backend response:', customCode);
      throw this.constants.Errors.Default;
    }
    throw new Error(knownErr);
  }
}
