import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { authkeep, ledgerkeep } from '../../assets/configs.json';
import { AuthService } from './auth.service';

const defaultResponse = new Error('Please try again later.');

const backendCustomCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  TRANSACTION_NOT_FOUND: 'TRANSACTION_NOT_FOUND',
  UNAUTHORIZED_OPERATION: 'UNAUTHORIZED_OPERATION',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  PASSWORD_RESET_ID_NOT_FOUND: 'PASSWORD_RESET_ID_NOT_FOUND',
  SIGNUP_ID_NOT_FOUND: 'SIGNUP_ID_NOT_FOUND',
  CATEGORY_ALREADY_EXISTS: 'CATEGORY_ALREADY_EXISTS',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
  CATEGORY_IN_USE: 'CATEGORY_IN_USE',
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  async getToken(email: string, password: string): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.getToken}`;

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { 'x-email': email, 'x-password': password },
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data || !response.data.token) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.USER_NOT_FOUND) {
        throw new Error('Invalid Credentials.');
      }
      if (customCode === backendCustomCodes.UNAUTHORIZED_OPERATION) {
        throw new Error('Invalid Credentials.');
      }
      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async initPasswordReset(email: string): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.initPasswordReset}`;

    try {
      return await this.httpClient.post(endpoint, { email }).toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.USER_NOT_FOUND) {
        throw new Error('No account found with this mail.');
      }
      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async finishPasswordReset(passwordResetID: string, newPassword: string): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.finishPasswordReset}/${passwordResetID}`;

    try {
      return await this.httpClient.patch(endpoint, { newPassword }).toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.PASSWORD_RESET_ID_NOT_FOUND) {
        throw new Error('Expired or corrupt password change request.');
      }
      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async initSignup(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.initSignup}`;

    try {
      return await this.httpClient
        .post(endpoint, { email, firstName, lastName, password })
        .toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.USER_ALREADY_EXISTS) {
        throw new Error('This Email is already in use.');
      }
      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async finishSignup(signupID: string): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.finishSignup}/${signupID}`;

    try {
      return await this.httpClient.put(endpoint, {}).toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.USER_ALREADY_EXISTS) {
        throw new Error('This user account is already confirmed.');
      }
      if (customCode === backendCustomCodes.SIGNUP_ID_NOT_FOUND) {
        throw new Error('Invalid confirmation link.');
      }
      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getUser(): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.getUser}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async updateUser(updates: any): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.updateUser}`;
    const token = this.authService.getToken();

    try {
      return await this.httpClient
        .patch(endpoint, updates, {
          headers: { authorization: token },
        })
        .toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async updateUserPassword(currentPassword: string, newPassword: string): Promise<any> {
    const endpoint = `${authkeep.address}${authkeep.updateUserPassword}`;
    const token = this.authService.getToken();

    try {
      return await this.httpClient
        .patch(
          endpoint,
          { currentPassword, newPassword },
          {
            headers: { authorization: token },
          },
        )
        .toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (customCode === backendCustomCodes.UNAUTHORIZED_OPERATION) {
        throw new Error('Incorrect password entered.');
      }
      if (customCode === backendCustomCodes.USER_NOT_FOUND) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getCategories(): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.getCategories}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getTransactions(queries: { [key: string]: any }): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.getTransactions}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
          params: queries,
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      if (customCode === backendCustomCodes.CATEGORY_NOT_FOUND) {
        throw new Error('Provided category does not exist.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getTransaction(id: string): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.getTransaction}/${id}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getSum(queries: any): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.getSum}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
          params: queries,
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getTxCount(queries: any): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.getTxCount}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
          params: queries,
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async getCatCount(): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.getCatCount}`;
    const token = this.authService.getToken();

    try {
      const response = await this.httpClient
        .get(endpoint, {
          headers: { authorization: token },
        })
        .toPromise()
        // This line converts 'res' from type Object to type any.
        .then((res: any) => res);

      if (!response || !response.data) {
        throw defaultResponse;
      }
      return response;
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async createCategory(name: string): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.putCategory}/${name}`;
    const token = this.authService.getToken();

    try {
      return await this.httpClient
        .put(endpoint, null, {
          headers: { authorization: token },
        })
        .toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      if (customCode === backendCustomCodes.CATEGORY_ALREADY_EXISTS) {
        throw new Error('Category already exists.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async deleteCategory(name: string): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.deleteCategory}/${name}`;
    const token = this.authService.getToken();

    try {
      return await this.httpClient
        .delete(endpoint, {
          headers: { authorization: token },
        })
        .toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      if (customCode === backendCustomCodes.CATEGORY_NOT_FOUND) {
        throw new Error('Category does not exist.');
      }

      if (customCode === backendCustomCodes.CATEGORY_IN_USE) {
        throw new Error('Category contains transactions.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }

  async updateTransaction(id: string, updates: any): Promise<any> {
    const endpoint = `${ledgerkeep.address}${ledgerkeep.updateTransaction}/${id}`;
    const token = this.authService.getToken();

    try {
      return await this.httpClient
        .patch(endpoint, updates, {
          headers: { authorization: token },
        })
        .toPromise();
    } catch (err) {
      const customCode = err.error && err.error.customCode;
      if (!customCode) {
        console.warn('No customCode present in Backend error response.');
        throw defaultResponse;
      }
      if (
        customCode === backendCustomCodes.USER_NOT_FOUND ||
        customCode === backendCustomCodes.UNAUTHORIZED_OPERATION
      ) {
        this.authService.logout();
        throw new Error('You are not authorized for this action.');
      }

      if (customCode === backendCustomCodes.TOKEN_EXPIRED) {
        this.authService.logout();
        throw new Error('Your session has expired.');
      }

      if (customCode === backendCustomCodes.TRANSACTION_NOT_FOUND) {
        throw new Error('No such transaction exists.');
      }

      if (customCode === backendCustomCodes.CATEGORY_NOT_FOUND) {
        throw new Error('No such category exists.');
      }

      console.warn('Unexpected response from backend:', err);
      throw defaultResponse;
    }
  }
}
