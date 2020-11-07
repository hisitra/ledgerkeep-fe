import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validation } from '../../../assets/configs.json';

@Component({
  selector: 'app-user-general-update-card',
  templateUrl: './user-general-update-card.component.html',
  styleUrls: ['./user-general-update-card.component.css'],
})
export class UserGeneralUpdateCardComponent implements OnInit {
  @Input() user: { email: string; firstName: string; lastName: string; createdAt: number };
  @Input() action: (firstName: string, lastName: string) => Promise<void>;

  public isLoading = false;

  public generalUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.generalUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.pattern(validation.nameRegex)],
      lastName: ['', Validators.pattern(validation.nameRegex)],
    });
  }

  ngOnInit() {
    const interval = setInterval(() => {
      if (this.user && this.user.firstName) {
        this.generalUpdateForm.setValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
        });

        clearInterval(interval);
      }
    }, 200);
  }

  async onSubmit(): Promise<void> {
    if (this.generalUpdateForm.invalid) {
      return;
    }

    this.setLoading(true);

    const values = this.generalUpdateForm.value;
    try {
      await this.action(values.firstName, values.lastName);
    } catch (err) {}

    this.setLoading(false);
  }

  setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.generalUpdateForm.disable() : this.generalUpdateForm.enable();
  }
}
