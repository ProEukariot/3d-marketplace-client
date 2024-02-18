import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static acceptExt(allowedExt: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value;
      if (!files || !files.length) return null;

      const extensions = files.map((file) => file.name.split('.').pop()!);

      for (let ext of extensions) {
        if (!allowedExt.includes(ext)) {
          return { acceptExt: true };
        }
      }

      return null;
    };
  }

  static uniqueFilesExt(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let extRecords: Record<string, any> = {};

      const files: File[] = control.value;
      if (!files || !files.length) return null;

      const filesExt = files.map((file) => file.name.split('.').pop()!);

      for (let ext of filesExt) {
        console.log(extRecords[ext], !!extRecords[ext]);

        if (extRecords[ext]) return { uniqueExt: true };

        extRecords[ext] = true;
      }

      return null;
    };
  }

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
