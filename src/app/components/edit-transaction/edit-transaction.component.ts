import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { ConfirmService } from '../../services/confirm.service';
import { LedgerquillService } from '../../services/ledgerquill.service';

const amountValidator = (formGroup: FormGroup) => {
  const amount = formGroup.controls.amount;
  const value = parseFloat(amount.value);
  if (isNaN(value) || value <= 0) {
    amount.setErrors({ invalid: true });
  } else {
    amount.setErrors(null);
  }
};

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent implements OnInit {
  public txForm: FormGroup;
  public catNames: string[] = [];
  public isCategoryLoading = false;

  private transaction: any;

  private pIsDelLoading = false;
  private pIsUpdLoading = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { [key: string]: any },
    private sheetRef: MatBottomSheetRef<EditTransactionComponent>,
    private formBuilder: FormBuilder,
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
    private confirm: ConfirmService,
    private ledgerquill: LedgerquillService,
  ) {
    this.transaction = this.data.tx;

    this.txForm = this.formBuilder.group(
      {
        amount: [Math.abs(this.transaction.amount), Validators.required],
        amountType: [this.transaction.amount < 0 ? 'debit' : 'credit', Validators.required],
        date: [new Date(this.transaction.date), Validators.required],
        category: [this.transaction.category, Validators.required],
        notes: [this.transaction.notes],
      },
      {
        validators: [amountValidator],
      },
    );
  }

  get isUpdLoading(): boolean {
    return this.pIsUpdLoading;
  }

  set isUpdLoading(value: boolean) {
    value ? this.txForm?.disable() : this.txForm?.enable();
    this.pIsUpdLoading = value;
  }

  get isDelLoading(): boolean {
    return this.pIsDelLoading;
  }

  set isDelLoading(value: boolean) {
    value ? this.txForm?.disable() : this.txForm?.enable();
    this.pIsDelLoading = value;
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadCategories()]);
    this.txForm.get('category')?.setValue(this.transaction.category);
  }

  public async onUpdateClick(): Promise<void> {
    if (this.isUpdLoading || this.isDelLoading) {
      return;
    }
    if (this.txForm.invalid) {
      return;
    }

    const values = this.txForm.value;
    const body: any = {
      amount: (values.amountType === 'debit' ? -1 : 1) * Math.abs(values.amount),
      timestamp: values.date.getTime(),
      category: values.category,
      notes: values.notes || '',
    };

    const amountSame = this.transaction.amount === body.amount;
    const dateSame = this.transaction.date === body.timestamp;
    const categorySame = this.transaction.category === body.category;
    const notesSame = this.transaction.notes === body.notes;
    if (amountSame && dateSame && categorySame && notesSame) {
      this.snack.warn('No updates provided.');
      return;
    }

    const token = await this.authService.getToken();
    this.isUpdLoading = true;
    try {
      await this.ledgerquill.updateTransaction(token, this.transaction.id, body);

      this.data.onUpdate(body);
      this.snack.success('Transaction updated.');
      this.sheetRef.dismiss();
    } catch (err) {
      this.snack.error(err.message);
    }
    this.isUpdLoading = false;
  }

  public async onDeleteClick(): Promise<void> {
    if (this.isUpdLoading || this.isDelLoading) {
      return;
    }

    const allow = await this.confirm.prompt('Confirm Deletion?');
    if (!allow) {
      return;
    }

    this.isDelLoading = true;

    const token = this.authService.getToken();
    try {
      await this.ledgerquill.deleteTransaction(token, this.transaction.id);
      this.data.onDelete();
      this.snack.success('Transaction deleted.');
      this.sheetRef.dismiss();
    } catch (err) {
      this.snack.error(err.message);
    }

    this.isDelLoading = false;
  }

  private async loadCategories(): Promise<void> {
    this.isCategoryLoading = true;
    const token = await this.authService.getToken();
    try {
      this.catNames = (await this.ledgerlens.getCategories(token)) as any[];
    } catch (err) {
      this.snack.error('Failed to load categories.');
    }
    this.isCategoryLoading = false;
  }
}
