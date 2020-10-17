import { StaticReflector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { theme, validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
})
export class LoginCardComponent implements OnInit {
  public primaryColor = theme.dpa.primary;

  public isLoading = false;

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(validation.regex.password)]],
    });
  }

  ngOnInit() {}

  onFormSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.loginForm.disable() : this.loginForm.enable();
  }
}
