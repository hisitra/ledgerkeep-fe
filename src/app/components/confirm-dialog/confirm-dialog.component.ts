import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  onConfirm(): void {
    if (this.data && this.data.reply && typeof this.data.reply === 'function') {
      this.data.reply(true);
    }
  }

  onCancel(): void {
    if (this.data && this.data.reply && typeof this.data.reply === 'function') {
      this.data.reply(false);
    }
  }
}
