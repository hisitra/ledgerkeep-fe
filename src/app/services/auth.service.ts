import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'LK_TOKEN';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
