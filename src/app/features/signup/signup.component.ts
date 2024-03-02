import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AppValidators } from 'src/app/shared/validators/app-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  hidePwd = { pwd: true, confirmPwd: true };
  signupForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly localService: LocalStorageService,
    private readonly router: Router
  ) {
    this.signupForm = new FormGroup(
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

  onSubmit() {
    if (this.signupForm.invalid) return;

    const formValues = this.signupForm.value;

    this.authService
      .signUp({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      })
      .subscribe(
        (token) => {
          this.authService.saveToken(token);
          this.router.navigateByUrl('/explore', { replaceUrl: true });
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
