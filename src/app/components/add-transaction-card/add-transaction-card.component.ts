import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

import { validation } from '../../../assets/configs.json';

const amountValidator = (formGroup: FormGroup) => {
  const amount = formGroup.controls.amount;
  const value = parseFloat(amount.value);
  if (typeof value !== 'number' || isNaN(value) || value <= 0) {
    amount.setErrors({ invalid: true });
  } else {
    amount.setErrors(null);
  }
};

@Component({
  selector: 'app-add-transaction-card',
  templateUrl: './add-transaction-card.component.html',
  styleUrls: ['./add-transaction-card.component.css'],
})
export class AddTransactionCardComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() action: (data: any) => any;

  public addTxForm: FormGroup;

  private pIsLoading = false;

  @Input() set isLoading(value: boolean) {
    this.pIsLoading = value;
    value ? this.addTxForm.disable() : this.addTxForm.enable();
  }

  get isLoading(): boolean {
    return this.pIsLoading;
  }

  constructor(
    private formBuilder: FormBuilder,
    private backend: BackendService,
    private alertService: AlertService,
  ) {
    this.addTxForm = this.formBuilder.group(
      {
        amount: ['', [Validators.required]],
        amountType: ['debit'],
        date: ['', [Validators.required]],
        category: ['', [Validators.required, Validators.pattern(validation.categoryRegex)]],
        description: [''],
      },
      {
        validators: [amountValidator],
      },
    );
  }

  async ngOnInit() {}

  public async buttonAction(): Promise<void> {
    if (this.isLoading || this.addTxForm.invalid) {
      return;
    }

    const values = this.addTxForm.value;

    const newTransaction = {
      amount: parseFloat(values.amount) * (values.amountType === 'debit' ? -1 : 1),
      timestamp: values.date.getTime(),
      category: values.category,
      description: values.description,
    };

    this.action(newTransaction);
  }
}
