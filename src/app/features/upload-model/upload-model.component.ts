import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import {
  Observable,
  BehaviorSubject,
  of,
  switchMap,
  catchError,
  throwError,
  EMPTY,
} from 'rxjs';
import { FileDroppedEvent } from 'src/app/shared/directives/drag-and-drop.directive';
import { FileInputComponent } from 'src/app/shared/components/file-input/file-input.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { Model3dService } from 'src/app/shared/services/model3d.service';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  uploadModelForm!: FormGroup;
  @ViewChild(FileInputComponent) dndFileInput!: FileInputComponent;

  constructor(
    private readonly http: HttpClient,
    private readonly matSnackBar: MatSnackBar,
    private readonly model3dService: Model3dService
  ) {}

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
      files: new FormControl<File[] | null>(null, [
        Validators.required,
        AppValidators.uniqueFilesExt(),
        AppValidators.acceptExt(['glb']),
      ]),
    });
  }

  onFileDropped(event: FileDroppedEvent) {
    console.log(event);
    const fileList = event.files;

    // const files = Array.from(fileList);
    this.dndFileInput.onFileChange(fileList);
  }

  onDragOver() {}

  onDragLeave() {}

  onSubmit() {
    const baseUrl = environment.apiUrl;

    if (this.uploadModelForm.valid) {
      const body = {
        name: this.uploadModelForm.controls['name'].value,
        amount: this.uploadModelForm.controls['amount'].value,
      };

      const files = this.uploadModelForm.controls['files'].value as File[];

      const formData = new FormData();
      files.forEach((file) => formData.append('files', file, file.name));

      this.model3dService.createModel3d(body);

      this.model3dService
        .createModel3d(body)
        .pipe(
          catchError((error) => {
            const mes = '3D model is not created';
            this.openSnackBar(mes);

            console.error(error);
            return EMPTY;
          }),
          switchMap((res: { insertedId: string }) => {
            formData.append('model3dId', res.insertedId);

            return this.model3dService.createFiles(formData);
          })
        )
        .subscribe(
          (res: { insertedIds: string[] }) => {
            this.openSnackBar(
              `Files added sucsessfully: ${res.insertedIds.length}`
            );
          },
          (error) => {
            const mes = 'Files are not uploaded';
            this.openSnackBar(mes);

            console.error(error);
            return EMPTY;
          }
        );
    }

    // this.log();
  }

  private openSnackBar(message: string) {
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: message,
    });
  }
}
