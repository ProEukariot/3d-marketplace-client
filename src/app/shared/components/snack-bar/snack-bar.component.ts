import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export type NotificationType = 'error' | 'success' | 'warning' | 'info';
export type NotificationData = { message: string; type: NotificationType };

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    @Inject(MatSnackBarRef) public snackBarRef: MatSnackBarRef<any>
  ) {}
}
