import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-edit-transaction-card',
  templateUrl: './edit-transaction-card.component.html',
  styleUrls: ['./edit-transaction-card.component.css'],
})
export class EditTransactionCardComponent implements OnInit {
  @Input() categories: string[] = [];

  private editTxForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editTxForm = this.formBuilder.group(
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

  ngOnInit() {
    this.editTxForm.disable();
  }

  public setTransaction(transaction: { [key: string]: any }): void {
    this.editTxForm.controls.amount.setValue(Math.abs(transaction.amount).toString());
    this.editTxForm.controls.amountType.setValue(transaction.amount > 0 ? 'credit' : 'debit');
    this.editTxForm.controls.date.setValue(
      new Date(new Date(transaction.timestamp).setHours(0, 0, 0, 0)),
    );
    this.editTxForm.controls.category.setValue(transaction.category);
    this.editTxForm.controls.description.setValue(transaction.description);

    this.editTxForm.enable();
  }
}
