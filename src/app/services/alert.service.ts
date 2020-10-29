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
    this.alert(message, 'info', 'primary', persistent);
  }

  success(message: string, persistent = false): void {
    this.alert(message, 'done', 'primary', persistent);
  }

  warn(message: string, persistent = false): void {
    this.alert(message, 'warning', 'accent', persistent);
  }

  error(message: string, persistent = false): void {
    this.alert(message, 'error', 'warn', persistent);
  }

  load(message: string, persistent = false): void {
    this.alert(message, 'hourglass_empty', 'accent', persistent);
  }

  private alert(message: string, iconName: string, color: string, persistent: boolean): void {
    if (persistent) {
      this.dialog.open(AlertDialogComponent, {
        width: '400px',
        data: { iconName, message },
      });

      return;
    }

    this.snackbar.openFromComponent(AlertSnackbarComponent, {
      data: { iconName, message, color },
      duration: configs.ui.snackbarDuration,
    });
  }
}
