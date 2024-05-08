import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: (error: any) => `This field is required`,
  minlength: (error: any) =>
    `Expect ${error.requiredLength} but got ${error.actualLength}`,
  maxlength: (error: any) =>
    `Expect ${error.requiredLength} but got ${error.actualLength}`,
  pattern: (error: any) => `Expect latin chars and digits`,
  email: (error: any) => `Expect an email`,
  noMatch: (error: any) => `Fields do not match`,
  min: (error: any) => `Min value is ${error.min} but got ${error.actual}`,
  max: (error: any) => `Max value is ${error.max} but got ${error.actual}`,
  acceptExt: (error: any) => `Expect ${error.expect} but got ${error.actual}`,
  maxArrayLength: (error: any) =>
    `Expect ${error.expect} item(s) but got ${error.actual}`,
  uniqueExt: (error: any) => `File ext are not unique`,

  _: (error: any) => 'The control is not valid',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
