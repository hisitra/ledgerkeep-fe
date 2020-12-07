import { Injectable } from '@angular/core';
import Authkeep from 'authkeep-client';
import { ConfigService } from './config.service';

const code2Message = {
  USER_NOT_FOUND: 'Invalid Credentials.',
  UNAUTHORIZED: 'Invalid Credentials.',
};

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
      throw this.handleError(err);
    }
  }

  private handleError(err: Error): Error {
    const message = code2Message[err.message];
    if (message) {
      return new Error(message);
    }
    return new Error('Please try again later.');
  }
}
