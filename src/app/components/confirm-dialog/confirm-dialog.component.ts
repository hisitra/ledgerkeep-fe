import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; action: () => any },
  ) {}

  ngOnInit() {}

  public action(): void {
    this.data.action();
    this.dialog.close();
  }

  public cancel(): void {
    this.dialog.close();
  }
}
