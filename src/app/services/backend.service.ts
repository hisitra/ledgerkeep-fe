import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { authkeep } from '../../assets/configs.json';

const defaultResponse = new Error('Please try again later.');

const backendCustomCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  TRANSACTION_NOT_FOUND: 'TRANSACTION_NOT_FOUND',
  UNAUTHORIZED_OPERATION: 'UNAUTHORIZED_OPERATION',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  async getToken(email: string, secret: string): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.getToken}`;
    console.log(arguments);
    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { 'x-email': email, 'x-secret': secret },
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data || !response.data.token) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      console.error(err);
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.USER_NOT_FOUND) {
        throw new Error('Invalid Credentials.');
      }
      if (customCode === backendCustomCodes.UNAUTHORIZED_OPERATION) {
        throw new Error('Invalid Credentials.');
      }
      throw defaultResponse;
    }
  }
}
