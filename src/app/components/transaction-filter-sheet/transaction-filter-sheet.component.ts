import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';
import { MtqueryService } from 'src/app/services/mtquery.service';

import { validation } from '../../../assets/configs.json';

const startDateValidator = (formGroup: FormGroup) => {
  const startDate = formGroup.controls.startDate;

  // The value from document.getElementByID will not be the latest value
  // without this setTimeout
  setTimeout(() => {
    const node = document.getElementById('startDateInput') as HTMLInputElement;

    if (!node || node.value === '') {
      startDate.setErrors(null);
      return;
    }

    if (!startDate.value || !(startDate.value instanceof Date)) {
      startDate.setErrors({ invalid: true });
    } else {
      startDate.setErrors(null);
    }
  }, 0);
};

const endDateValidator = (formGroup: FormGroup) => {
  const startDate = formGroup.controls.startDate;
  const endDate = formGroup.controls.endDate;

  // The value from document.getElementByID will not be the latest value
  // without this setTimeout
  setTimeout(() => {
    const node = document.getElementById('endDateInput') as HTMLInputElement;

    if (!node || node.value === '') {
      endDate.setErrors(null);
      return;
    }

    if (!endDate.value || !(endDate.value instanceof Date)) {
      endDate.setErrors({ invalid: true });
    } else if (
      startDate.value instanceof Date &&
      endDate.value.getTime() < startDate.value.getTime()
    ) {
      endDate.setErrors({ tooLow: true });
    } else {
      endDate.setErrors(null);
    }
  }, 0);
};

const startAmountValidator = (formGroup: FormGroup) => {
  const startAmount = formGroup.controls.startAmount;

  const node = document.getElementById('startAmountInput') as HTMLInputElement;

  if (!node || node.value === '') {
    startAmount.setErrors(null);
    return;
  }

  if (typeof startAmount.value !== 'number' || isNaN(startAmount.value)) {
    startAmount.setErrors({ invalid: true });
  } else {
    startAmount.setErrors(null);
  }
};

const endAmountValidator = (formGroup: FormGroup) => {
  const endAmount = formGroup.controls.endAmount;
  const startAmount = formGroup.controls.startAmount;

  const node = document.getElementById('endAmountInput') as HTMLInputElement;

  if (!node || node.value === '') {
    endAmount.setErrors(null);
    return;
  }

  if (typeof endAmount.value !== 'number' || isNaN(endAmount.value)) {
    endAmount.setErrors({ invalid: true });
  } else if (
    typeof startAmount.value === 'number' &&
    !isNaN(startAmount.value) &&
    endAmount.value < startAmount.value
  ) {
    endAmount.setErrors({ tooLow: true });
  } else {
    endAmount.setErrors(null);
  }
};

@Component({
  selector: 'app-transaction-filter-sheet',
  templateUrl: './transaction-filter-sheet.component.html',
  styleUrls: ['./transaction-filter-sheet.component.css'],
})
export class TransactionFilterSheetComponent implements OnInit {
  public filterForm: FormGroup;

  public categories: string[] = [];
  public isLoading = false;

  constructor(
    private backend: BackendService,
    private formBuilder: FormBuilder,
    private router: Router,
    private mtq: MtqueryService,
    private sheet: MatBottomSheetRef<TransactionFilterSheetComponent>,
    private alertService: AlertService,
  ) {
    this.filterForm = this.formBuilder.group(
      {
        startDate: [''],
        endDate: [''],
        startAmount: [''],
        endAmount: [''],
        category: ['', [Validators.pattern(validation.categoryRegex)]],
      },
      {
        validators: [
          startDateValidator,
          endDateValidator,
          startAmountValidator,
          endAmountValidator,
        ],
      },
    );

    this.loadCategories();
  }

  async ngOnInit() {
    await this.loadQuery();
  }

  async processQuery(): Promise<void> {
    if (this.filterForm.invalid) {
      return;
    }

    const values = this.filterForm.value;

    const query: any = {};
    if (values.startDate instanceof Date) {
      query.startTime = values.startDate.getTime();
    }
    if (values.endDate instanceof Date) {
      query.endTime = values.endDate.getTime();
    }
    if (values.startAmount) {
      query.startAmount = values.startAmount;
    }
    if (values.endAmount) {
      query.endAmount = values.endAmount;
    }
    if (values.category) {
      query.category = values.category;
    }

    await this.router.navigate([], { queryParams: query });
    this.sheet.dismiss();
  }

  clearQuery(): void {
    this.filterForm.reset();
  }

  private async loadQuery(): Promise<void> {
    const currentQuery = await this.mtq.getQuery();

    if (currentQuery.startTime) {
      this.filterForm.get('startDate').setValue(new Date(currentQuery.startTime));
    }
    if (currentQuery.endTime) {
      this.filterForm.get('endDate').setValue(new Date(currentQuery.endTime));
    }
    if (currentQuery.startAmount) {
      this.filterForm.get('startAmount').setValue(currentQuery.startAmount);
    }
    if (currentQuery.endAmount) {
      this.filterForm.get('endAmount').setValue(currentQuery.endAmount);
    }
    if (currentQuery.category) {
      this.filterForm.get('category').setValue(currentQuery.category);
    }
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.filterForm.disable() : this.filterForm.enable();
  }

  private async loadCategories(): Promise<void> {
    this.setLoading(true);

    try {
      const result = await this.backend.getCategories();
      this.categories = result.data;
    } catch (err) {
      this.alertService.error('Failed to load categories');
      this.categories = [];
    }

    this.setLoading(false);
  }
}
