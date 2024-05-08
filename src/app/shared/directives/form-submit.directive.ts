import { Directive, ElementRef } from '@angular/core';
import { fromEvent, shareReplay, tap } from 'rxjs';

@Directive({
  selector: '[formGroup]',
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(
    tap(() => {
      if (this.element.classList.contains('submitted') === false) {
        this.element.classList.add('submitted');
      }
    }),
    shareReplay(1)
  );

  constructor(private formRef: ElementRef<HTMLFormElement>) {}

  get element() {
    return this.formRef.nativeElement;
  }
}
