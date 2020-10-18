import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from '../components/alert-snackbar/alert-snackbar.component';
import configs from '../../assets/configs.json';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackbar: MatSnackBar) {}

  info(message: string, persistent = false): void {
    this.alert(message, 'info', persistent);
  }

  success(message: string, persistent = false): void {
    this.alert(message, 'success', persistent);
  }

  warn(message: string, persistent = false): void {
    this.alert(message, 'warn', persistent);
  }

  error(message: string, persistent = false): void {
    this.alert(message, 'error', persistent);
  }

  load(message: string, persistent = false): void {
    this.alert(message, 'load', persistent);
  }

  private alert(message: string, type: string, persistent: boolean): void {
    if (!persistent) {
      console.log('Calling snack');
      this.snackbar.openFromComponent(AlertSnackbarComponent, {
        data: { type, message, ctx: this.snackbar },
        duration: configs.ui.snackbarDuration,
      });
    }
  }
}
