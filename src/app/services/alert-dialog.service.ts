import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  constructor(private dialog: MatDialog) {}

  public success(message: string): void {
    this.alert(message, 'check', 'primary');
  }

  public info(message: string): void {
    this.alert(message, 'info', 'primary');
  }

  public warn(message: string): void {
    this.alert(message, 'warning', 'accent');
  }

  public error(message: string): void {
    this.alert(message, 'error', 'warn');
  }

  private alert(message: string, iconName: string, color: string): void {
    const data = { iconName, message, color };
    this.dialog.open(AlertDialogComponent, { width: '400px', data });
  }
}
