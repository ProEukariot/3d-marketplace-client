import { Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// @Directive({
//   selector: '[file-accessor]',
// })
// export class FileValueAccessor {
//   @HostListener('change', ['$event'])
//   onChange = (param: any) => {
//     console.log(param);
//   };
// }

@Directive({
  selector: 'input[type=file]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FileValueAccessor },
  ],
})
export class FileValueAccessor implements ControlValueAccessor {
  value: any;
  disabled!: boolean;

  @HostListener('change', ['$event.target.files'])
  onChange = (value: any) => {};

  @HostListener('blur')
  onTouch = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;

    // this.onChange = (val: any) => {
    //   console.log(val);
    // };
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
