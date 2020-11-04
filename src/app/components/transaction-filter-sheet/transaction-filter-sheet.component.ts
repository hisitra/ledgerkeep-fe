import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute) {
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
  }

  ngOnInit() {}

  processQuery(): void {}

  clearQuery(): void {}
}
