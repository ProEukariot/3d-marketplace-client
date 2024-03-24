import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signinForm = new FormGroup({
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

  onSubmit() {
    if (this.signinForm.invalid) return;

    const formValue = this.signinForm.value;

    this.authService
      .signIn({ username: formValue.username, password: formValue.password })
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
