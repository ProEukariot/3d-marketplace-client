import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  addModelForm!: FormGroup;
  files: File[] = [];
  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.addModelForm = new FormGroup({
      name: new FormControl(''),
      amount: new FormControl(10),
      fileName: new FormControl(''),
    });
  }

  log() {
    // console.log(this.fileInput);
    console.log('Loaded:', this.files);
  }

  handleFileInputChange(fileList: FileList | null) {
    if (!fileList) return;

    let displayFiles = fileList.item(0)?.name;

    if (fileList.length > 1)
      displayFiles = `${displayFiles} (+${fileList.length - 1} files)`;

    this.addModelForm.get('fileName')?.setValue(displayFiles);
  }

  addFiles(input: HTMLInputElement) {
    if (!input.files) return;

    const files = Array.from(input.files);
    this.files.push(...files);
  }

  removeFiles(position: number) {
    this.files.splice(position, 1);
  }

  submitForm() {
    // console.log(this.addModelForm.value);
  }
}
