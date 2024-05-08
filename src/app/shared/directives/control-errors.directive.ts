import {
  ComponentRef,
  Directive,
  Host,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { NgControl } from '@angular/forms';
import { EMPTY, Observable, Subject, merge, takeUntil } from 'rxjs';
import { FORM_ERRORS } from '../constants/default-errors';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
  selector: '[formControlName], [formControl]',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  submit$: Observable<Event>;

  container!: ViewContainerRef;
  controlErrorRef!: ComponentRef<ControlErrorComponent>;

  constructor(
    @Self() private ngControl: NgControl,
    @Inject(FORM_ERRORS) private errors: any,
    @Optional() @Host() private form: FormSubmitDirective,
    private vcr: ViewContainerRef,
    @Optional() controlErrorContainer: ControlErrorContainerDirective
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnInit(): void {
    merge(this.submit$, this.ngControl.valueChanges!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const controlErrors = this.ngControl.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey] ?? this.errors['_'];
          const text = getError(controlErrors[firstKey]);

          this.setError(text);
        } else if (this.controlErrorRef) {
          this.setError(null);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setError(text: string | null) {
    if (!this.controlErrorRef)
      this.controlErrorRef = this.container.createComponent(
        ControlErrorComponent
      );

    this.controlErrorRef.instance.text = text ?? '';
  }
}
