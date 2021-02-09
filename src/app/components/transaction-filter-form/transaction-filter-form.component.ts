import { Component, OnInit } from '@angular/core';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LedgerlensService } from '../../services/ledgerlens.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';

const startTimeValidator = (formGroup: FormGroup) => {
  const startTime = formGroup.controls.startTime;

  // The value from document.getElementByID will not be the latest value
  // without this setTimeout
  setTimeout(() => {
    const node = document.getElementById('startTimeInput') as HTMLInputElement;

    if (!node || node.value === '') {
      startTime.setErrors(null);
      return;
    }

    if (!startTime.value || !(startTime.value instanceof Date)) {
      startTime.setErrors({ invalid: true });
    } else {
      startTime.setErrors(null);
    }
  }, 0);
};

const endTimeValidator = (formGroup: FormGroup) => {
  const startTime = formGroup.controls.startTime;
  const endTime = formGroup.controls.endTime;

  // The value from document.getElementByID will not be the latest value
  // without this setTimeout
  setTimeout(() => {
    const node = document.getElementById('endTimeInput') as HTMLInputElement;

    if (!node || node.value === '') {
      endTime.setErrors(null);
      return;
    }

    if (!endTime.value || !(endTime.value instanceof Date)) {
      endTime.setErrors({ invalid: true });
    } else if (
      startTime.value instanceof Date &&
      endTime.value.getTime() < startTime.value.getTime()
    ) {
      endTime.setErrors({ tooLow: true });
    } else {
      endTime.setErrors(null);
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
  public sortables = [
    { name: 'Amount', value: 'amount' },
    { name: 'Date', value: 'timestamp' },
    { name: 'Category', value: 'category' },
  ];

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
        startTime: [''],
        endTime: [''],
        category: [''],
        notesHint: [''],
        sortField: [''],
        sortOrder: [''],
      },
      {
        validators: [
          startTimeValidator,
          endTimeValidator,
          startAmountValidator,
          endAmountValidator,
        ],
      },
    );
  }

  private static paramMap2Obj(map: ParamMap): { [key: string]: string | null } {
    const queries: { [key: string]: string | null } = {};
    for (const key of map.keys) {
      queries[key] = map.get(key);
    }
    return queries;
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadQuery(), this.loadCategories()]);
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

    const query = await this.getCurrentQuery();
    for (const prop of Object.keys(values)) {
      delete query[prop];
    }

    if (values.startTime instanceof Date) {
      query.startTime = values.startTime.getTime();
    }
    if (values.endTime instanceof Date) {
      query.endTime = values.endTime.getTime();
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
    if (values.sortField) {
      query.sortField = values.sortField;
    }
    if (values.sortOrder) {
      query.sortOrder = values.sortOrder;
    }

    await this.router.navigate([], { queryParams: query });
    this.secondaryDrawerService.close();
  }

  private async loadQuery(): Promise<void> {
    return new Promise((resolve) => {
      this.route.queryParamMap.subscribe((params) => {
        const startAmount = params.get('startAmount');
        const endAmount = params.get('endAmount');
        const startTime = params.get('startTime');
        const endTime = params.get('endTime');
        const category = params.get('category');
        const notesHint = params.get('notesHint');
        const sortField = params.get('sortField');
        const sortOrder = params.get('sortOrder');

        try {
          if (startAmount !== null) {
            this.filterForm.get('startAmount')?.setValue(startAmount);
          }
          if (endAmount !== null) {
            this.filterForm.get('endAmount')?.setValue(endAmount);
          }
          if (startTime !== null) {
            this.filterForm.get('startTime')?.setValue(new Date(parseInt(startTime, 10)));
          }
          if (endTime !== null) {
            this.filterForm.get('endTime')?.setValue(new Date(parseInt(endTime, 10)));
          }
          if (category !== null) {
            this.filterForm.get('category')?.setValue(category);
          }
          if (notesHint !== null) {
            this.filterForm.get('notesHint')?.setValue(notesHint);
          }
          if (sortField !== null) {
            this.filterForm.get('sortField')?.setValue(sortField);
          }
          if (sortOrder !== null) {
            this.filterForm.get('sortOrder')?.setValue(sortOrder);
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

  private async getCurrentQuery(): Promise<{ [key: string]: string | null }> {
    return new Promise((resolve) => {
      const subscription = this.route.queryParamMap.subscribe((params: ParamMap) => {
        resolve(TransactionFilterFormComponent.paramMap2Obj(params));
      });
      setTimeout(() => subscription.unsubscribe());
    });
  }
}
