import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-forgot-card',
  templateUrl: './forgot-card.component.html',
  styleUrls: ['./forgot-card.component.css'],
})
export class ForgotCardComponent implements OnInit {
  @Input() action: (email: string) => Promise<void>;

  public passwordResetForm: FormGroup;
  public isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validation.emailRegex)]],
    });
  }

  ngOnInit() {}

  async onFormSubmit(): Promise<void> {
    if (this.passwordResetForm.invalid) {
      return;
    }

    const email = this.passwordResetForm.value.email;

    this.setLoading(true);

    try {
      await this.action(email);
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.passwordResetForm.disable() : this.passwordResetForm.enable();
  }
}
