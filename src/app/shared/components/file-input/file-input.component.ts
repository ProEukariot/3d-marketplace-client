import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { FileDroppedEvent } from '../../directives/drag-and-drop';

const FILE_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => FileInputComponent),
};

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [FILE_INPUT_VALUE_ACCESSOR],
})
export class FileInputComponent implements ControlValueAccessor, OnInit {
  files: File[] | null = null;

  onChange = (files: File[] | null) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  ngControl!: NgControl;

  @Input() multiple: boolean = false;
  @Input() accept: string = '*/*';
  @ViewChild('droppedFiles') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(@Inject(Injector) private injector: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  onFileDropped(event: FileDroppedEvent) {
    this.onFileChange(event.files);
  }

  onFileChange(fileList: FileList | null) {
    this.markAsTouched();

    if (!fileList) return;

    const files = Array.from(fileList);

    const savedFiles = this.files ?? [];

    this.files = [...savedFiles, ...files];

    console.log(this.files);

    this.onChange(this.files);
  }

  onFileRemoval(index: number) {
    if (this.files) {
      this.files.splice(index, 1);
      this.onChange(this.files);
    }
    console.log(this.files);
  }

  markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  writeValue(obj: File[] | null): void {
    this.files = obj;
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
}
