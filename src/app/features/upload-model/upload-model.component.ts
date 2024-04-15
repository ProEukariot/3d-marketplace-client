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
  finalize,
} from 'rxjs';
import { FileDroppedEvent } from 'src/app/shared/directives/drag-and-drop.directive';
import { FileInputComponent } from 'src/app/shared/components/file-input/file-input.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { Model3dService } from 'src/app/shared/services/model3d.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;
  @ViewChild('materialInp') materialFileInp!: FileInputComponent;

  constructor(
    private readonly model3dService: Model3dService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    public readonly loaderService: LoaderService
  ) {}

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) return;

    const materialFiles = this.form.controls['materials'].value as File[];
    const modelFiles = this.form.controls['models'].value as File[];

    const formData = new FormData();

    formData.append('title', this.form.controls['title'].value);
    formData.append('price', this.form.controls['price'].value);

    materialFiles.forEach((file) =>
      formData.append('materials', file, file.name)
    );
    modelFiles.forEach((file) => formData.append('models', file, file.name));

    this.loaderService.show();

    this.model3dService
      .upload3dModel(formData)
      .pipe(
        finalize(() => {
          this.loaderService.hide();
        })
      )
      .subscribe(
        (insertedResult) => {
          this.router.navigate(['explore']);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.notificationService.showNotification(
            'An error occured.',
            'error'
          );
        }
      );
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
      price: new FormControl(0, [Validators.min(0), Validators.required]),
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
