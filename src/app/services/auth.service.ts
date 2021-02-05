import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'LK_TOKEN';

  constructor() {}

  public isLoggedIn(): boolean {
    return this.getToken() !== '';
  }

  public getToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token === null ? '' : token;
  }
}
