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
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;
  @ViewChild('materialInp') materialFileInp!: FileInputComponent;

  constructor(public dialog: MatDialog) {}

  onSubmit() {
    this.formSubmitted = true;
    console.log(this.form.valid);
    console.log(this.form.value);

    // const baseUrl = environment.apiUrl;

    //   if (this.uploadModelForm.valid) {
    //     const body = {
    //       name: this.uploadModelForm.controls['name'].value,
    //       amount: this.uploadModelForm.controls['amount'].value,
    //     };

    //     const files = this.uploadModelForm.controls['files'].value as File[];

    //     const formData = new FormData();
    //     files.forEach((file) => formData.append('files', file, file.name));

    //     this.model3dService.createModel3d(body);

    //     this.model3dService
    //       .createModel3d(body)
    //       .pipe(
    //         catchError((error) => {
    //           const mes = '3D model is not created';
    //           this.openSnackBar(mes);

    //           console.error(error);
    //           return EMPTY;
    //         }),
    //         switchMap((res: { insertedId: string }) => {
    //           formData.append('model3dId', res.insertedId);

    //           return this.model3dService.createFiles(formData);
    //         })
    //       )
    //       .subscribe(
    //         (res: { insertedIds: string[] }) => {
    //           this.openSnackBar(
    //             `Files added sucsessfully: ${res.insertedIds.length}`
    //           );
    //         },
    //         (error) => {
    //           const mes = 'Files are not uploaded';
    //           this.openSnackBar(mes);

    //           console.error(error);
    //           return EMPTY;
    //         }
    //       );
  }

  hasError(controlName: string) {
    return (
      this.form.controls[controlName].invalid &&
      (this.form.controls[controlName].dirty ||
        this.form.controls[controlName].touched ||
        this.formSubmitted)
    );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9-_]*$'),
      ]),
      materials: new FormControl<File[]>(
        [],
        [
          AppValidators.acceptExt(['png', 'jpg', 'jpeg']),
          AppValidators.maxArrayLength(20),
        ]
      ),
      models: new FormControl<File[]>(
        [],
        [
          Validators.required,
          AppValidators.uniqueFilesExt(),
          AppValidators.acceptExt(['glb', 'obj', 'fbx']),
          AppValidators.maxArrayLength(20),
        ]
      ),
    });
  }
}
