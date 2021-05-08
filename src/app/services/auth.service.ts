import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryDrawerService } from './secondary-drawer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'LK_TOKEN';

  constructor(private router: Router, private secStorage: SecondaryDrawerService) {}

  public async logout(): Promise<void> {
    localStorage.removeItem(this.TOKEN_KEY);
    this.secStorage.close();
    await this.router.navigate(['/landing']);
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== '';
  }

  public getToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token === null ? '' : 'Bearer ' + token;
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
