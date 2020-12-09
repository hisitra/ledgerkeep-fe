import { Injectable } from '@angular/core';
import Authkeep from 'authkeep-client';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthkeepService {
  private client: Authkeep;

  constructor(private conf: ConfigService) {
    const configs = this.conf.get();
    this.client = new Authkeep(configs.api.authkeep);
  }

  public async getToken(email: string, password: string): Promise<any> {
    try {
      return await this.client.getToken(email, password);
    } catch (err) {
      throw this.handleError(err, {
        USER_NOT_FOUND: 'Invalid Credentials.',
        UNAUTHORIZED: 'Invalid Credentials.',
      });
    }
  }

  public async postUserForgotPasswordLink(email: string): Promise<any> {
    try {
      return await this.client.postUserForgotPasswordLink(email);
    } catch (err) {
      throw this.handleError(err, {
        USER_NOT_FOUND: 'No user found with this mail.',
      });
    }
  }

  private handleError(err: Error, code2Message: { [key: string]: string }): Error {
    const message = code2Message[err.message];
    if (message) {
      return new Error(message);
    }
    console.warn('Unexpected error from backend:', err.message);
    return new Error('Please try again later.');
  }
}
