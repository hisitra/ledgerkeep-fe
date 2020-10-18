import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

import { theme, validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  public primaryColor = theme.dpaPrimary;

  public isLoading = false;

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private backend: BackendService,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validation.emailRegex)]],
      password: ['', [Validators.required, Validators.pattern(validation.passwordRegex)]],
    });
  }

  ngOnInit() {}

  async onFormSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.setLoading(true);

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    try {
      const response = await this.backend.getToken(email, password);
      const token = response.data.token;

      this.authService.setEmail(email);
      this.authService.setToken(token);

      this.alertService.success('Login successful.');
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.loginForm.disable() : this.loginForm.enable();
  }
}
