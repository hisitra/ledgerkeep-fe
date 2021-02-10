import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { ConfirmService } from '../../services/confirm.service';
import { LedgerquillService } from '../../services/ledgerquill.service';

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

    this.txForm = this.formBuilder.group({
      amount: [Math.abs(this.transaction.amount)],
      amountType: [this.transaction.amount < 0 ? 'debit' : 'credit'],
      date: [new Date(this.transaction.date)],
      category: [this.transaction.category],
      notes: [this.transaction.notes],
    });
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

  public async onUpdateClick(): Promise<void> {}

  public async onDeleteClick(): Promise<void> {
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
      const categories = (await this.ledgerlens.getCategories(token)) as any[];
      this.catNames = categories.map((cat) => cat.name);
    } catch (err) {
      this.snack.error('Failed to load categories.');
    }
    this.isCategoryLoading = false;
  }
}
