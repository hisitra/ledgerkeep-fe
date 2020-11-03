import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validation } from '../../../assets/configs.json';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.css'],
})
export class NewCategoryDialogComponent implements OnInit {
  public isLoading = false;
  public newCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<NewCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: (name: string) => Promise<void> },
  ) {
    this.newCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(validation.categoryRegex)]],
    });
  }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.newCategoryForm.invalid) {
      return;
    }

    this.setLoading(true);

    try {
      await this.data.action(this.newCategoryForm.value.name);
    } catch (err) {}

    this.dialog.close();
    this.setLoading(false);
  }

  setLoading(state: boolean) {
    this.isLoading = state;
    state ? this.newCategoryForm.disable() : this.newCategoryForm.enable();
  }
}
