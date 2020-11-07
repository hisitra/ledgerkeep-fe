import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';
import { ElqService } from 'src/app/services/elq.service';

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

@Component({
  selector: 'app-el-filter-sheet',
  templateUrl: './el-filter-sheet.component.html',
  styleUrls: ['./el-filter-sheet.component.css'],
})
export class ElFilterSheetComponent implements OnInit {
  static categories: string[] = [];

  public filterForm: FormGroup;

  public isLoading = false;

  constructor(
    private backend: BackendService,
    private formBuilder: FormBuilder,
    private router: Router,
    private elq: ElqService,
    private sheet: MatBottomSheetRef<ElFilterSheetComponent>,
    private alertService: AlertService,
  ) {
    this.filterForm = this.formBuilder.group(
      {
        startDate: [''],
        endDate: [''],
        interval: ['day'],
        category: ['', [Validators.pattern(validation.categoryRegex)]],
      },
      {
        validators: [startDateValidator, endDateValidator],
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
    if (values.category) {
      query.category = values.category;
    }
    query.interval = values.interval;

    await this.router.navigate([], { queryParams: query });
    this.sheet.dismiss();
  }

  clearQuery(): void {
    this.filterForm.reset();
  }

  private async loadQuery(): Promise<void> {
    const currentQuery = await this.elq.getQuery();

    if (currentQuery.startTime) {
      this.filterForm.get('startDate').setValue(new Date(currentQuery.startTime));
    }
    if (currentQuery.endTime) {
      this.filterForm.get('endDate').setValue(new Date(currentQuery.endTime));
    }
    if (currentQuery.category) {
      this.filterForm.get('category').setValue(currentQuery.category);
    }
    this.filterForm.get('interval').setValue(currentQuery.interval);
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.filterForm.disable() : this.filterForm.enable();
  }

  private async loadCategories(): Promise<void> {
    if (ElFilterSheetComponent.categories.length > 0) {
      return;
    }

    this.setLoading(true);

    try {
      const result = await this.backend.getCategories();
      ElFilterSheetComponent.categories = result.data;
    } catch (err) {
      this.alertService.error('Failed to load categories');
      ElFilterSheetComponent.categories = [];
    }

    this.setLoading(false);
  }

  getCategories(): string[] {
    return ElFilterSheetComponent.categories;
  }
}
