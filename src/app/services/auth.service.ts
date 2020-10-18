import { Injectable } from '@angular/core';

import configs from '../../assets/configs.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isSoftLoggedIn(): boolean {
    return this.getEmail() && this.getToken() && true;
  }

  getEmail(): string {
    return localStorage.getItem(configs.auth.emailKey);
  }

  getToken(): string {
    return localStorage.getItem(configs.auth.tokenKey);
  }

  setEmail(email: string): void {
    localStorage.setItem(configs.auth.emailKey, email);
  }

  setToken(token: string): void {
    localStorage.setItem(configs.auth.tokenKey, token);
  }
}
