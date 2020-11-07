import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

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
  @Input() updateAction: (transaction: any) => Promise<void>;
  @Input() delAction: () => Promise<void>;

  private pIsLoading = false;

  @Input() set isLoading(value: boolean) {
    this.pIsLoading = value;
    value ? this.editTxForm.disable() : this.editTxForm.enable();
  }

  get isLoading(): boolean {
    return this.pIsLoading;
  }

  public editTxForm: FormGroup;
  private originalTx: { [key: string]: any };

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
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

  ngOnInit() {}

  public setTransaction(transaction: { [key: string]: any }): void {
    this.originalTx = transaction;

    this.editTxForm.controls.amount.setValue(Math.abs(transaction.amount).toString());
    this.editTxForm.controls.amountType.setValue(transaction.amount > 0 ? 'credit' : 'debit');
    this.editTxForm.controls.date.setValue(
      new Date(new Date(transaction.timestamp).setHours(0, 0, 0, 0)),
    );
    this.editTxForm.controls.category.setValue(transaction.category);
    this.editTxForm.controls.description.setValue(transaction.description);
  }

  public async updateTransaction(): Promise<void> {
    if (this.editTxForm.invalid || this.isLoading) {
      return;
    }

    if (!this.isDataChanged()) {
      this.alertService.warn('No updates provided.');
      return;
    }

    const values = this.editTxForm.value;
    const newTransaction = {
      amount: parseFloat(values.amount) * (values.amountType === 'debit' ? -1 : 1),
      timestamp: values.date.getTime(),
      category: values.category,
      description: values.description,
    };

    try {
      await this.updateAction(newTransaction);
      this.originalTx = newTransaction;
    } catch (err) {}
  }

  public async deleteTransaction(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    try {
      await this.delAction();
    } catch (err) {}
  }

  private isDataChanged(): boolean {
    const values = this.editTxForm.value;

    if (parseFloat(values.amount) !== Math.abs(this.originalTx.amount)) {
      return true;
    }
    if (values.amountType !== (this.originalTx.amount > 0 ? 'credit' : 'debit')) {
      return true;
    }
    if (values.date.getTime() !== new Date(this.originalTx.timestamp).setHours(0, 0, 0, 0)) {
      return true;
    }
    if (values.category !== this.originalTx.category) {
      return true;
    }
    if (values.description !== this.originalTx.description) {
      return true;
    }
    return false;
  }
}
