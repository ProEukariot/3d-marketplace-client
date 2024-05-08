import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    this.authService
      .signIn({ username: formValue.username, password: formValue.password })
      .subscribe(
        (token) => {
          this.authService.saveToken(token);
          this.router.navigateByUrl('/explore', { replaceUrl: true });
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status == 401) {
            this.notificationService.showNotification(
              'Wrong credentials!',
              'error'
            );
          }
        }
      );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9-_]*$'),
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9-_]*$'),
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }
}
