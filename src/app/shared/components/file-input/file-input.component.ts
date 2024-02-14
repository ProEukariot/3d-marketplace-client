import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FileDroppedEvent } from '../../directives/drag-and-drop';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

const FILE_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => FileInputComponent),
};

const FILE_INPUT_MAT_FORM_FIELD_CONTROL = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => FileInputComponent),
};

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [FILE_INPUT_MAT_FORM_FIELD_CONTROL],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class FileInputComponent
  implements
    ControlValueAccessor,
    OnInit,
    OnDestroy,
    MatFormFieldControl<File[] | null>
{
  static nextId = 0;

  @ViewChild('droppedFiles') fileInputRef!: ElementRef<HTMLInputElement>;
  @Input() multiple: boolean = false;
  @Input() accept: string = '*/*';

  // @Input()
  // mode!: 'default' | 'stack';

  control!: FormControl<File[] | null>;

  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'file';

  id = `file-input-${FileInputComponent.nextId++}`;

  onChange = (files: File[] | null) => {};
  onTouched = () => {};

  get empty() {
    return !this.control.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy!: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this.disabled ? this.control.disable() : this.control.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value(): File[] | null {
    return this.control.value;
  }

  set value(value: File[] | null) {
    this.control.setValue(value);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.control.invalid && this.control.touched;
  }

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {}

  ngOnInit(): void {
    if (this.ngControl != null) this.ngControl.valueAccessor = this;

    this.control = new FormControl(null);
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this.elementRef.nativeElement.querySelector(
      '.file-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.control.valid) {
    }
  }

  autofilled?: boolean | undefined;

  // onFileDropped(event: FileDroppedEvent) {
  //   this.onFileChange(event.files);
  // }

  // onFileChange(fileList: FileList | null) {
  //   this.markAsTouched();

  //   if (!fileList) return;

  //   const files = Array.from(fileList);

  //   const savedFiles = this.files ?? [];

  //   this.files = [...savedFiles, ...files];

  //   console.log(this.files);

  //   this.onChange(this.files);
  // }

  // onFileRemoval(index: number) {
  //   if (this.files) {
  //     this.files.splice(index, 1);
  //     this.onChange(this.files);
  //   }
  //   console.log(this.files);
  // }

  // markAsTouched() {
  //   if (!this.touched) {
  //     this.touched = true;
  //     this.onTouched();
  //   }
  // }

  // writeValue(obj: File[] | null): void {
  //   this.files = obj;
  // }
  writeValue(obj: File[] | null): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(): void {
    this.onChange(this.value);
  }
}
