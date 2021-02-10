import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { LedgerquillService } from '../../services/ledgerquill.service';
import { AuthService } from '../../services/auth.service';
import { SnackService } from '../../services/snack.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  public isLoading = false;
  public catForm: FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { [key: string]: any },
    private sheetRef: MatBottomSheetRef<CreateCategoryComponent>,
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private ledgerquill: LedgerquillService,
    private authService: AuthService,
    private snack: SnackService,
  ) {
    this.catForm = this.formBuilder.group({
      name: [''],
    });

    this.configService.get().then((conf) => {
      this.catForm
        .get('name')
        ?.setValidators([
          Validators.required,
          Validators.pattern(conf.validations.categoryNamePattern),
        ]);
    });
  }

  ngOnInit(): void {}

  async onCreateClick(): Promise<void> {
    if (this.catForm.invalid || this.isLoading) {
      return;
    }

    const values = this.catForm.value;
    const token = this.authService.getToken();
    this.setLoading(true);

    try {
      await this.ledgerquill.createCategory(token, values.name);

      this.data.onCreate(values.name);
      this.snack.success('Category created.');
      this.sheetRef.dismiss();
    } catch (err) {
      this.snack.error(err.message);
    }

    this.setLoading(false);
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;
    state ? this.catForm.disable() : this.catForm.enable();
  }
}
