import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  async prompt(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: { message, reply: resolve },
      });
    });
  }
}
