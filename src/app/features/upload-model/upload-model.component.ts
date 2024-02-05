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
  lastInputFiles: File[] = [];
  @ViewChild('filePreview') filePreview!: ElementRef<HTMLInputElement>;

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
      displayFiles: new FormControl(null),
      files: new FormControl<File[] | null>(null, [Validators.required]),
      test: new FormControl(null,  Validators.required),
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
    // console.log(this.fileInput);
    // console.log('Loaded:', this.files);

    // console.log('DP:', this.uploadModelForm.controls['droppedFiles'].value);
    // console.log(this.uploadModelForm.controls['droppedFiles'].errors);
    console.log(this.uploadModelForm.get('test')?.value);
    console.log(this.uploadModelForm.get('test')?.errors);

    // console.log(this.uploadModelForm.value);
    // console.log('files', this.uploadModelForm.get('files')?.errors);
    // console.log(
    //   'displayFiles',
    //   this.uploadModelForm.get('displayFiles')?.errors
    // );
  }

  handleFileInputChange(fileList: FileList | null) {
    if (!fileList) return;

    let displayFiles = fileList.item(0)?.name || 'Files not selected';

    if (fileList.length > 1)
      displayFiles = `${displayFiles} (+${fileList.length - 1} files)`;

    this.filePreview.nativeElement.value = displayFiles;

    // /
    // const errors = this.uploadModelForm.controls['files'].errors;
    // console.log("PPP", errors);
    // console.log(this.uploadModelForm.controls['displayFiles']);
    // this.uploadModelForm.controls['displayFiles'].setErrors(errors)

    // this.uploadModelForm.get('fileName')?.setValue(displayFiles);

    // const files = Array.from(fileList);

    // this.lastInputFiles = files;
  }

  addFiles(inputFiles: FileList | null) {
    if (!inputFiles) return;

    const files = Array.from(inputFiles);

    const filesSelectedBefore: File[] | null =
      this.uploadModelForm.get('files')?.value;

    this.uploadModelForm.patchValue({
      files: [...(filesSelectedBefore || []), ...files],
    });
    // this.files.push(...files);
  }

  removeFiles(position: number) {
    const files: File[] = this.uploadModelForm.get('files')?.value;

    console.log(files.splice(position, 1));

    if (!files.length) this.uploadModelForm.patchValue({ droppedFiles: null });

    // this.uploadModelForm.patchValue({ files: null });
    // this.files.splice(position, 1);
  }

  submitForm() {
    // console.log(this.uploadModelForm.value);
    this.log();
  }
}
