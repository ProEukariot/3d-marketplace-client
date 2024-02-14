import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  NgControl,
  AbstractControlDirective,
  ControlValueAccessor,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject, take } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { AppDirectivesModule } from '../../directives/app-directives.module';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-dnd-file-input',
  templateUrl: './dnd-file-input.component.html',
  styleUrls: ['./dnd-file-input.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: DndFileInputComponent },
  ],
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, AppDirectivesModule],
})
export class DndFileInputComponent
  implements
    MatFormFieldControl<File[] | null>,
    OnInit,
    OnDestroy,
    ControlValueAccessor
{
  static nextId = 0;

  // @ViewChild('inputBtn', { static: true })
  // inputBtnRef!: ElementRef<HTMLButtonElement>;

  @ViewChild('fileInput', { static: true })
  fileInputRef!: ElementRef<HTMLInputElement>;

  @Input()
  mode: 'default' | 'stack' = 'default';

  @Input() multiple: boolean = false;
  @Input() accept: string = '*/*';

  files!: File[] | null;

  @Input()
  set value(value: File[] | null) {
    this.control.setValue(value);
    this.onChange(value);
    this.stateChanges.next();
  }

  get value() {
    if (!this.control.value) return null;
    const files = Array.from(this.control.value) as File[];
    return files;

    // return this.control.value;
  }

  stateChanges = new Subject<void>();

  @HostBinding()
  id = `dnd-file-input-id-${DndFileInputComponent.nextId++}`;

  placeholder!: string;

  focused!: boolean;

  get empty() {
    return !this.value || this.value.length < 0;
  }

  shouldLabelFloat!: boolean;

  @Input()
  required!: boolean;

  @Input()
  disabled!: boolean;

  get errorState() {
    return this.errorMatcher.isErrorState(this.ngControl.control, this.form);
  }

  controlType = 'dnd-file-input';

  // autofilled?: boolean | undefined;

  @HostBinding('attr.aria-describedby')
  userAriaDescribedBy = '';

  control!: FormControl;

  constructor(
    private readonly focusMonitor: FocusMonitor,
    private errorMatcher: ErrorStateMatcher,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @SkipSelf() @Host() public form: FormGroupDirective
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.control = new FormControl();
  }

  onChange = (value: File[] | null) => {};
  onTouch = () => {};

  writeValue(obj: File[] | null): void {
    // this._value = obj;
    // this.files = obj;
    this.value = obj;
    this.files = obj;
    this.control.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.control.disable();
    this.stateChanges.next();
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.fileInputRef).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
    this.focusMonitor
      .monitor(this.fileInputRef)
      .pipe(take(1))
      .subscribe(() => this.onTouch());
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.fileInputRef);
    this.stateChanges.complete();
  }

  log(value?: any) {
    console.log('LOG', this.control.errors);
  }

  // private updateValue(newValue: File[] | null) {
  //   const arr = [...(this.files ?? []), ...(newValue ?? [])];
  //   return arr;
  // }

  onFileChange(fileList: FileList | null) {
    if (this.disabled) return;
    this.focus();

    //if no files selected
    if (!fileList) {
      if (this.mode == 'stack') {
        this.value = this.files;
        return;
      }

      this.value = null;
      return;
    }

    const files = Array.from(fileList);

    if (this.mode == 'stack') {
      this.files = [...(this.files ?? []), ...files];
      this.value = this.files;
      return;
    }

    this.value = files;
  }

  removeFile() {
    this.files = null;
    this.value = this.files;
    this.onChange(this.files);
  }

  removeFileAt(index: number) {
    if (this.mode != 'stack')
      throw new Error('Method used only with stack mode');

    if (this.files) {
      this.files.splice(index, 1);
      if (this.files.length < 1) {
        this.files = null;
      }
      this.value = this.files;
      this.onChange(this.files);
    }
    return;
  }

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    // this.focusMonitor.focusVia(this.fileInputRef, 'program');
  }

  focus() {
    this.focusMonitor.focusVia(this.fileInputRef, 'program');
  }
}
