import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
})
export class EditTransactionComponent implements OnInit {
  public txForm: FormGroup;
  public catNames: string[] = [];
  public isCategoryLoading = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { [key: string]: any },
    private sheetRef: MatBottomSheetRef<EditTransactionComponent>,
    private formBuilder: FormBuilder,
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
  ) {
    this.txForm = this.formBuilder.group({
      amount: [this.data.amount],
      date: [new Date(this.data.date)],
      category: [this.data.category],
      notes: [this.data.notes],
    });
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadCategories()]);
    this.txForm.get('category')?.setValue(this.data.category);
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
