import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private backend: BackendService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  async onFormSubmit(email: string, password: string): Promise<void> {
    try {
      const response = await this.backend.getToken(email, password);
      const token = response.data.token;

      this.authService.setEmail(email);
      this.authService.setToken(token);

      this.alertService.success('Login successful.');
      this.router.navigate(['/profile']);
    } catch (err) {
      this.alertService.error(err.message);
    }
  }
}
