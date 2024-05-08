import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      const registeredErrorrs = control.errors ?? {};

      if (control.value !== matchingControl.value) {
        control.setErrors({ ...registeredErrorrs, noMatch: true });
      } else {
        delete registeredErrorrs['noMatch'];
        let errors =
          Object.entries(registeredErrorrs).length > 0
            ? registeredErrorrs
            : null;
        control.setErrors(errors);
      }

      return null;
    };
  }

  static acceptExt(allowedExt: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value;
      if (!files || !files.length) return null;

      const extensions = files.map((file) => file.name.split('.').pop()!);

      for (let ext of extensions) {
        if (!allowedExt.includes(ext)) {
          return {
            acceptExt: {
              expect: allowedExt.join(', '),
              actual: extensions.join(', '),
            },
          };
        }
      }

      return null;
    };
  }

  static maxArrayLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const arr = control.value;

      return arr.length > max
        ? { maxArrayLength: { expect: max, actual: arr.length } }
        : null;
    };
  }

  static uniqueFilesExt(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let extRecords: Record<string, any> = {};

      const files: File[] = control.value;
      if (!files || !files.length) return null;

      const filesExt = files.map((file) => file.name.split('.').pop()!);

      for (let ext of filesExt) {
        // console.log(extRecords[ext], !!extRecords[ext]);

        if (extRecords[ext]) return { uniqueExt: true };

        extRecords[ext] = true;
      }

      return null;
    };
  }

  // static requiredFiles(files: File[]): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const hasError = files.length < 1;
  //     return hasError ? { requiredfiles: true } : null;
  //   };
  // }

  static alwaysError(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return { alwaysError: true };
    };
  }

  static isEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasError = !control.value || control.value?.length < 1;
      return hasError ? { isEmpty: true } : null;
    };
  }
}
