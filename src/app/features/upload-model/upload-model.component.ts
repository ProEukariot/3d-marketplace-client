import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  uploadModelForm!: FormGroup;
  @ViewChild('filePreview') filePreview!: ElementRef<HTMLInputElement>;

  getControl(name: string) {
    return this.uploadModelForm.controls[name];
  }

  ngOnInit(): void {
    this.uploadModelForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9-_]*$'),
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(99999),
      ]),
      files: new FormControl(null, Validators.required),
    });
  }

  onFileInput(fileList: FileList | null) {
    if (!fileList) return;

    const files = Array.from(fileList);

    const filesSelectedBefore: File[] | null =
      this.uploadModelForm.get('droppedFiles')?.value;

    this.uploadModelForm.patchValue({
      droppedFiles: [...(filesSelectedBefore || []), ...files],
    });
  }

  log() {
    console.log(this.uploadModelForm.value);
    console.log(this.uploadModelForm.get('files')?.errors);
  }

  handleFileInputChange(fileList: FileList | null) {
    if (!fileList) return;

    let displayFiles = fileList.item(0)?.name || 'Files not selected';

    if (fileList.length > 1)
      displayFiles = `${displayFiles} (+${fileList.length - 1} files)`;

    this.filePreview.nativeElement.value = displayFiles;
  }

  addFiles(inputFiles: FileList | null) {
    if (!inputFiles) return;

    const files = Array.from(inputFiles);

    const filesSelectedBefore: File[] | null =
      this.uploadModelForm.get('files')?.value;

    this.uploadModelForm.patchValue({
      files: [...(filesSelectedBefore || []), ...files],
    });
  }

  removeFiles(position: number) {
    const files: File[] = this.uploadModelForm.get('files')?.value;

    console.log(files.splice(position, 1));

    if (!files.length) this.uploadModelForm.patchValue({ droppedFiles: null });
  }

  onSubmit() {
    console.log(this.uploadModelForm.value);
    this.log();
  }
}
