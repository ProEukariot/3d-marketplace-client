import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static requiredFiles(files: File[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log('Val-F', files);

      const hasError = files.length < 1;
      return hasError ? { requiredfiles: true } : null;
    };
  }

  static alwaysError(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return { alwaysError: true };
    };
  }

  static isEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasError = !control.value || control.value?.length < 1;
      console.log('VALIDATOR:', !control.value, control.value?.length);
      return hasError ? { isEmpty: true } : null;
    };
  }
}
