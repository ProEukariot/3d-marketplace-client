import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  @Input() mode: 'default' | 'push' = 'default';
  @Input() multiple: boolean = false;
  @Input() label: string = 'Choose file';

  value: File[] = [];
  onChange!: (value: File[] | null) => void;
  onTouched!: () => void;

  removeAt(i: number) {
    if (this.value.length < i + 1) return;

    this.value?.splice(i, 1);
    this.onChange(this.value);
    this.onTouched();
  }

  clear() {
    this.value = [];
    this.onChange([]);
    this.onTouched();
  }

  setValue(fileList: FileList | null) {
    let inputFiles: File[] = [];

    if (fileList) {
      inputFiles = this.fileListToArray(fileList);
    }

    switch (this.mode) {
      case 'push':
        this.value?.push(...inputFiles);
        break;
      default:
        this.value = inputFiles;
        break;
    }

    this.onChange(this.value);
    this.onTouched();
  }

  private fileListToArray(list: FileList) {
    return Array.from(list);
  }

  writeValue(obj: File[]): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
