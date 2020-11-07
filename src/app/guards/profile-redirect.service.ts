import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileRedirectService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthentic = this.authService.isSoftLoggedIn();

    if (isAuthentic) {
      this.router.navigate(['/profile']);
    }

    return !isAuthentic;
  }
}
