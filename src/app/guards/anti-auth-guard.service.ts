import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AntiAuthGuardService implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    const isLoggedIn = this.auth.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/profile']);
    }
    return !isLoggedIn;
  }
}
