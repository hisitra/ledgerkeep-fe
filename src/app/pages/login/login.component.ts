import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { AuthkeepService } from 'src/app/services/authkeep.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hidePass = true;
  public isLoading = false;
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private conf: ConfigService,
    private authkeep: AuthkeepService,
    private alert: SnackbarService,
    private auth: AuthService,
    private router: Router,
  ) {
    const configs = this.conf.get();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(configs.validation.emailRegex)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(configs.validation.passwordMinLength),
          Validators.pattern(configs.validation.passwordRegex),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  async loginBtnAction(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.isLoading = true;
    await this.login(email, password);
    this.isLoading = false;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await this.authkeep.getToken(email, password);
      this.auth.setToken(response.token);
      this.router.navigate(['/profile']);
    } catch (err) {
      this.alert.error(err.message);
    }
  }
}
