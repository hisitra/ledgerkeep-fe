import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerquillService {
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private constants: ConstantsService,
    private authService: AuthService,
  ) {}

  public async createCategory(token: string, name: string): Promise<void> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      await this.http.put(`${conf.ledgerquill.category}/${name}`, null, { headers }).toPromise();
    } catch (err) {
      await this.handleError(err, {
        [this.constants.CustomCodes.CategoryAlreadyExists]: 'Category already exists.',
      });
    }
  }

  public async deleteCategory(token: string, name: string): Promise<void> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      await this.http.delete(`${conf.ledgerquill.category}/${name}`, { headers }).toPromise();
    } catch (err) {
      await this.handleError(err, {
        [this.constants.CustomCodes.CategoryInUse]: 'Category is not empty.',
      });
    }
  }

  public async createTransaction(token: string, body: any): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      return await this.http.post(conf.ledgerquill.transaction, body, { headers }).toPromise();
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  public async updateTransaction(token: string, txID: string, body: any): Promise<void> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      await this.http
        .patch(`${conf.ledgerquill.transaction}/${txID}`, body, { headers })
        .toPromise();
    } catch (err) {
      await this.handleError(err, {});
    }
  }

  public async deleteTransaction(token: string, txID: string): Promise<void> {
    const conf = await this.configService.get();
    const headers = { authorization: token };

    try {
      await this.http.delete(`${conf.ledgerquill.transaction}/${txID}`, { headers }).toPromise();
      return;
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
