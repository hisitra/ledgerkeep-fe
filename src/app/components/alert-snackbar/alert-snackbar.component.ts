import { Inject, Component, OnInit } from '@angular/core';

import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-snackbar',
  templateUrl: './alert-snackbar.component.html',
  styleUrls: ['./alert-snackbar.component.css'],
})
export class AlertSnackbarComponent implements OnInit {
  constructor(
    private snackRef: MatSnackBarRef<AlertSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { iconName: string; message: string; color: string },
  ) {}

  ngOnInit() {}

  closeSnackbar(): void {
    this.snackRef.dismiss();
  }
}
