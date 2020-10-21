import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.css'],
})
export class SignupCardComponent implements OnInit {
  @Input() action: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<void>;

  public signupForm: FormGroup;
  public isLoading: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validation.emailRegex)]],
      firstName: ['', [Validators.required, Validators.pattern(validation.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(validation.nameRegex)]],
    });
  }

  ngOnInit() {}

  async onFormSubmit(): Promise<void> {
    if (this.signupForm.invalid) {
      return;
    }

    const { email, firstName, lastName, password } = this.signupForm.value;

    this.setLoading(true);

    try {
      await this.action(email, firstName, lastName, password);
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.signupForm.disable() : this.signupForm.enable();
  }
}
