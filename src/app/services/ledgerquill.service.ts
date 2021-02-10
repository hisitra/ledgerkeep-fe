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