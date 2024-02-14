import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { FileDroppedEvent } from 'src/app/shared/directives/drag-and-drop';
import { DndFileInputComponent } from 'src/app/shared/components/dnd-file-input/dnd-file-input.component';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  uploadModelForm!: FormGroup;
  @ViewChild(DndFileInputComponent) dndFileInput!: DndFileInputComponent;

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
      files: new FormControl<File[] | null>(null, [Validators.required]),
    });
  }

  log() {
    console.log(this.uploadModelForm.errors);
    // console.log(this.uploadModelForm.get('files')?.errors);
  }

  onFileDropped(event: FileDroppedEvent) {
    console.log(event);
    const fileList = event.files;

    // const files = Array.from(fileList);
    this.dndFileInput.onFileChange(fileList);
  }

  onDragOver() {}

  onDragLeave() {}

  onFileChange(any: any) {
    // const files = this.uploadModelForm.controls['files'].value;

    console.log(any);

    // const updatedFiles = [];

    // this.uploadModelForm.patchValue({ files: updatedFiles });
  }

  // removeFile(index: number) {
  //   let files = this.uploadModelForm.controls['files'].value as File[] | null;

  //   if (!files) return;

  //   files.splice(index, 1);

  //   files = files.length > 0 ? files : null;

  //   this.uploadModelForm.patchValue({ files: files });
  // }

  onSubmit() {
    // this.uploadModelForm.controls['files'].markAsTouched()
    console.log("Name", this.uploadModelForm.controls['name'].errors);
    console.log("Amount", this.uploadModelForm.controls['amount'].errors);
    console.log("Files", this.uploadModelForm.controls['files'].errors);
    
    console.log("VAL", this.uploadModelForm.value);

    // this.log();
  }
}
