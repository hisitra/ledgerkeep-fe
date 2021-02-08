import { Component, OnInit } from '@angular/core';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  setTimeout(() => {
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
  });
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
  selector: 'app-transaction-filter-form',
  templateUrl: './transaction-filter-form.component.html',
  styleUrls: ['./transaction-filter-form.component.css'],
})
export class TransactionFilterFormComponent implements OnInit {
  public isCategoryLoading = false;
  public catNames = [];

  public filterForm: FormGroup;

  constructor(
    private secondaryDrawerService: SecondaryDrawerService,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group(
      {
        startDate: [''],
        endDate: [''],
        startAmount: [''],
        endAmount: [''],
        category: [''],
        notesHint: [''],
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

  ngOnInit(): void {}

  public onClose(): void {
    this.secondaryDrawerService.close();
  }

  public onClear(): void {
    this.filterForm.reset();
  }

  public onFormSubmit(): void {
    if (this.filterForm.invalid) {
      return;
    }
  }
}
