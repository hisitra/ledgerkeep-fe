import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { LedgerquillService } from '../../services/ledgerquill.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

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
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css'],
})
export class CreateTransactionComponent implements OnInit {
  public txForm: FormGroup;
  public catNames: string[] = [];

  private pIsLoading = false;
  public isCategoryLoading = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { [key: string]: any },
    private formBuilder: FormBuilder,
    private ledgerlens: LedgerlensService,
    private ledgerquill: LedgerquillService,
    private authService: AuthService,
    private snack: SnackService,
  ) {
    this.txForm = this.formBuilder.group(
      {
        amount: ['', Validators.required],
        amountType: ['debit', Validators.required],
        date: [new Date(), Validators.required],
        category: ['', Validators.required],
        notes: [''],
      },
      {
        validators: [amountValidator],
      },
    );
  }

  get isLoading(): boolean {
    return this.pIsLoading;
  }

  set isLoading(value: boolean) {
    value ? this.txForm?.disable() : this.txForm.enable();
    this.pIsLoading = value;
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadCategories()]);
    this.txForm.get('category')?.setValue('');
  }

  async onCreateClick(): Promise<void> {
    if (this.txForm.invalid) {
      return;
    }

    const token = await this.authService.getToken();
    const values = this.txForm.value;
    const body: any = {
      amount: (values.amountType === 'debit' ? -1 : 1) * Math.abs(values.amount),
      timestamp: values.date.getTime(),
      category_name: values.category,
      notes: values.notes || '',
    };

    this.isLoading = true;
    try {
      const data = await this.ledgerquill.createTransaction(token, body);

      body.id = data.transaction_id;
      this.data.onCreate(body);

      this.snack.success('Transaction created.');
      this.setDefaultForm();
    } catch (err) {
      this.snack.error(err.message);
    }
    this.isLoading = false;
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

  private setDefaultForm(): void {
    this.txForm.reset();

    this.txForm.get('amountType')?.setValue('debit');
    this.txForm.get('date')?.setValue(new Date());
  }
}
