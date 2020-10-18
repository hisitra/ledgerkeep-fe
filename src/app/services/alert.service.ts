import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertSnackbarComponent } from '../components/alert-snackbar/alert-snackbar.component';
import configs from '../../assets/configs.json';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {}

  info(message: string, persistent = false): void {
    this.alert(message, 'info', persistent);
  }

  success(message: string, persistent = false): void {
    this.alert(message, 'done', persistent);
  }

  warn(message: string, persistent = false): void {
    this.alert(message, 'warning', persistent);
  }

  error(message: string, persistent = false): void {
    this.alert(message, 'error', persistent);
  }

  load(message: string, persistent = false): void {
    this.alert(message, 'hourglass_empty', persistent);
  }

  private alert(message: string, iconName: string, persistent: boolean): void {
    if (persistent) {
      this.dialog.open(AlertDialogComponent, {
        width: '400px',
        data: { iconName, message },
      });

      return;
    }

    this.snackbar.openFromComponent(AlertSnackbarComponent, {
      data: { iconName, message },
      duration: configs.ui.snackbarDuration,
    });
  }
}
