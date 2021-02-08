import { Component, OnInit } from '@angular/core';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

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

    if (isNaN(parseFloat(startAmount.value))) {
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

  if (isNaN(parseFloat(endAmount.value))) {
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
  public sortables = ['Amount', 'Date', 'Category'];

  public filterForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ledgerlens: LedgerlensService,
    private authService: AuthService,
    private snack: SnackService,
    private secondaryDrawerService: SecondaryDrawerService,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group(
      {
        startAmount: [''],
        endAmount: [''],
        startDate: [''],
        endDate: [''],
        category: [''],
        notesHint: [''],
        sort: [''],
        order: [''],
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

  ngOnInit(): void {
    this.loadQuery();
    this.loadCategories();
  }

  public onClose(): void {
    this.secondaryDrawerService.close();
  }

  public onClear(): void {
    this.filterForm.reset();
  }

  public async onFormSubmit(): Promise<void> {
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
    if (values.notesHint) {
      query.notesHint = values.notesHint;
    }
    if (values.sort) {
      query.sort = values.sort;
    }
    if (values.order) {
      query.order = values.order;
    }

    await this.router.navigate([], { queryParams: query });
    this.secondaryDrawerService.close();
  }

  private async loadQuery(): Promise<void> {
    return new Promise((resolve) => {
      this.route.queryParamMap.subscribe((params) => {
        const startAmount = params.get('startAmount');
        const endAmount = params.get('endAmount');
        const startDate = params.get('startTime');
        const endDate = params.get('endTime');
        const category = params.get('category');
        const notesHint = params.get('notesHint');
        const sort = params.get('sort');
        const order = params.get('order');

        try {
          if (startAmount !== null) {
            this.filterForm.get('startAmount')?.setValue(startAmount);
          }
          if (endAmount !== null) {
            this.filterForm.get('endAmount')?.setValue(endAmount);
          }
          if (startDate !== null) {
            this.filterForm.get('startDate')?.setValue(new Date(parseInt(startDate, 10)));
          }
          if (endDate !== null) {
            this.filterForm.get('endDate')?.setValue(new Date(parseInt(endDate, 10)));
          }
          if (category !== null) {
            this.filterForm.get('category')?.setValue(category);
          }
          if (notesHint !== null) {
            this.filterForm.get('notesHint')?.setValue(notesHint);
          }
          if (sort !== null) {
            this.filterForm.get('sort')?.setValue(sort);
          }
          if (order !== null) {
            this.filterForm.get('order')?.setValue(order);
          }
          resolve();
        } catch (err) {}
      });
    });
  }

  private async loadCategories(): Promise<void> {
    if (this.catNames.length > 0) {
      return;
    }

    this.isCategoryLoading = true;
    const token = await this.authService.getToken();
    try {
      this.catNames = await this.ledgerlens.getCategories(token);
    } catch (err) {
      this.snack.error(err.message);
    }
    this.isCategoryLoading = false;
  }
}
