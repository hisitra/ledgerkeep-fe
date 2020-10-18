import { Inject, Component, OnInit } from '@angular/core';

import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-snackbar',
  templateUrl: './alert-snackbar.component.html',
  styleUrls: ['./alert-snackbar.component.css'],
})
export class AlertSnackbarComponent implements OnInit {
  private iconNameMap = {
    error: 'error',
    warn: 'warning',
    info: 'info',
    success: 'done',
    load: 'hourglass_empty',
  };

  iconName: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { type: string; message: string; ctx: MatSnackBar },
  ) {
    this.iconName = this.iconNameMap[data.type] || 'info';
  }

  ngOnInit() {}

  closeSnackbar(): void {
    this.data.ctx.dismiss();
  }
}
