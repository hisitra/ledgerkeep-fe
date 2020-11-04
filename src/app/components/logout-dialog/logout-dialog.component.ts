import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css'],
})
export class LogoutDialogComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { action: () => any },
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
