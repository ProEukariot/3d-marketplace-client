import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NotificationType,
  SnackBarComponent,
} from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  showNotification(message: string, type: NotificationType) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 8000,
      panelClass: [type],
      data: {
        message,
        type,
      },
    });
  }
}
