import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  @Input() action: (email: string, password: string) => Promise<void>;

  public isLoading = false;
  public hide = true;

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      await this.action(email, password);
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.loginForm.disable() : this.loginForm.enable();
  }
}
