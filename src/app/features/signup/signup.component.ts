import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AppValidators } from 'src/app/shared/validators/app-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) return;

    const formValue = this.form.value;

    this.authService
      .signUp({
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
      })
      .subscribe(
        (token) => {
          this.authService.saveToken(token);
          this.router.navigateByUrl('/explore', { replaceUrl: true });
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status == 400)
            this.notificationService.showNotification(
              error.error.message[0],
              'error'
            );
        }
      );
  }

  hasError(controlName: string, error: string) {
    return (
      this.form.controls[controlName].hasError(error) && this.formSubmitted
    );
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9-_]*$'),
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9-_]*$'),
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: AppValidators.match('confirmPassword', 'password') }
    );
  }
}
