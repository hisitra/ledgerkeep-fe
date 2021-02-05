import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-success',
  templateUrl: './auth-success.component.html',
  styleUrls: ['./auth-success.component.css'],
})
export class AuthSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(async (params) => {
      const token = params.get('access_token');
      if (token === null || token === '') {
        await this.router.navigate(['/landing']);
        return;
      }
      this.authService.setToken(token);
      await this.router.navigate(['/transactions']);
    });
  }
}
