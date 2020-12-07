import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hidePass = true;
  public isLoading = false;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private conf: ConfigService) {
    const configs = this.conf.get();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(configs.validation.emailRegex)]],
      password: ['', [Validators.required, Validators.pattern(configs.validation.passwordRegex)]],
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

  async login(email: string, password: string): Promise<void> {}
}
