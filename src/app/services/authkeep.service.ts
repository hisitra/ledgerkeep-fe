import { Injectable } from '@angular/core';
import Authkeep from 'authkeep-client';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthkeepService {
  private client: Authkeep;

  constructor(private conf: ConfigService, private auth: AuthService) {
    const configs = this.conf.get();
    this.client = new Authkeep(configs.api.authkeep);
  }

  // GENERAL ACCESS
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

  public async patchUserForgotPassword(forgotID: string, newPassword: string): Promise<any> {
    try {
      await this.client.patchUserForgotPassword(forgotID, newPassword);
    } catch (err) {
      throw this.handleError(err, {
        FORGOT_PASSWORD_ID_NOT_FOUND: 'Invalid link.',
      });
    }
  }

  public async postUserSignupLink(signupData: any): Promise<any> {
    try {
      await this.client.postUserSignupLink(signupData);
    } catch (err) {
      throw this.handleError(err, {
        USER_ALREADY_EXISTS: 'This email is already taken.',
      });
    }
  }

  public async putUser(signupID: any): Promise<any> {
    try {
      await this.client.putUser(signupID);
    } catch (err) {
      throw this.handleError(err, {
        SIGNUP_ID_NOT_FOUND: 'Link has expired.',
        USER_ALREADY_EXISTS: 'Link has expired.',
      });
    }
  }

  // USER ACCESS
  public async getUser(): Promise<any> {
    const token = this.auth.getToken();
    try {
      return await this.client.getUser(token);
    } catch (err) {
      throw this.handleError(err, {});
    }
  }

  public async patchUser(updates: any): Promise<any> {
    const token = this.auth.getToken();
    try {
      await this.client.patchUser(token, updates);
    } catch (err) {
      throw this.handleError(err, {});
    }
  }

  public async patchUserPassword(currentPassword: string, newPassword: string): Promise<any> {
    const token = this.auth.getToken();
    try {
      await this.client.patchUserPassword(token, currentPassword, newPassword);
    } catch (err) {
      throw this.handleError(err, {
        UNAUTHORIZED: 'Password is incorrect.',
      });
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
