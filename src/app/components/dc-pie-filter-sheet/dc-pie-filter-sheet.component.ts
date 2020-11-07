import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { PiequeryService } from 'src/app/services/piequery.service';

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
  selector: 'app-dc-pie-filter-sheet',
  templateUrl: './dc-pie-filter-sheet.component.html',
  styleUrls: ['./dc-pie-filter-sheet.component.css'],
})
export class DcPieFilterSheetComponent implements OnInit {
  public filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sheet: MatBottomSheetRef<DcPieFilterSheetComponent>,
    private pq: PiequeryService,
  ) {
    this.filterForm = this.formBuilder.group(
      {
        startDate: [''],
        endDate: [''],
      },
      {
        validators: [startDateValidator, endDateValidator],
      },
    );
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

    await this.router.navigate([], { queryParams: query });
    this.sheet.dismiss();
  }

  clearQuery(): void {
    this.filterForm.reset();
  }

  private async loadQuery(): Promise<void> {
    const currentQuery = await this.pq.getQuery();

    if (currentQuery.startTime) {
      this.filterForm.get('startDate').setValue(new Date(currentQuery.startTime));
    }
    if (currentQuery.endTime) {
      this.filterForm.get('endDate').setValue(new Date(currentQuery.endTime));
    }
  }
}
