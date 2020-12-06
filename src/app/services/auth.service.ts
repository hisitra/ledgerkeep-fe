import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private conf: ConfigService) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.conf.get().auth.tokenKey);
  }
}
