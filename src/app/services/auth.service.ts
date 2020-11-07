import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import configs from '../../assets/configs.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

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

  logout(): void {
    localStorage.removeItem(configs.auth.emailKey);
    localStorage.removeItem(configs.auth.tokenKey);

    this.router.navigate(['/home']);
  }
}
