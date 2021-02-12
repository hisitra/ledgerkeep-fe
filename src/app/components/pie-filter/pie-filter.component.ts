import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SecondaryDrawerService } from '../../services/secondary-drawer.service';

@Component({
  selector: 'app-pie-filter',
  templateUrl: './pie-filter.component.html',
  styleUrls: ['./pie-filter.component.css'],
})
export class PieFilterComponent implements OnInit {
  public filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private secondaryDrawerService: SecondaryDrawerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.filterForm = this.formBuilder.group({
      startTime: [''],
      endTime: [''],
      notesHint: [''],
    });
  }

  private static paramMap2Obj(map: ParamMap): { [key: string]: string | null } {
    const queries: { [key: string]: string | null } = {};
    for (const key of map.keys) {
      queries[key] = map.get(key);
    }
    return queries;
  }

  ngOnInit(): void {
    this.loadQuery().then();
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
      const snakeProp = prop.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      delete query[snakeProp];
    }

    if (values.startTime instanceof Date) {
      query.start_time = values.startTime.getTime();
    }
    if (values.endTime instanceof Date) {
      query.end_time = values.endTime.getTime();
    }
    if (values.notesHint) {
      query.notes_hint = values.notesHint;
    }

    await this.router.navigate([], { queryParams: query });
    this.secondaryDrawerService.close();
  }

  private async loadQuery(): Promise<void> {
    return new Promise((resolve) => {
      this.route.queryParamMap.subscribe((params) => {
        const startTime = params.get('start_time');
        const endTime = params.get('end_time');
        const notesHint = params.get('notes_hint');

        try {
          if (startTime !== null) {
            this.filterForm.get('startTime')?.setValue(new Date(parseInt(startTime, 10)));
          }
          if (endTime !== null) {
            this.filterForm.get('endTime')?.setValue(new Date(parseInt(endTime, 10)));
          }
          if (notesHint !== null) {
            this.filterForm.get('notesHint')?.setValue(notesHint);
          }
          resolve();
        } catch (err) {}
      });
    });
  }

  private async getCurrentQuery(): Promise<{ [key: string]: string | null }> {
    return new Promise((resolve) => {
      const subscription = this.route.queryParamMap.subscribe((params: ParamMap) => {
        resolve(PieFilterComponent.paramMap2Obj(params));
      });
      setTimeout(() => subscription.unsubscribe());
    });
  }
}
