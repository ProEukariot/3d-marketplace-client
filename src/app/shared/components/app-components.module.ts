import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AppDirectivesModule } from '../directives/app-directives.module';
import { FileInputComponent } from './file-input/file-input.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { Viewer3dComponent } from './viewer3d/viewer3d.component';
import { MyFileInputComponent } from './my-file-input/my-file-input.component';
@NgModule({
  declarations: [Viewer3dComponent, MyFileInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppDirectivesModule,
    FileInputComponent,
    SnackbarComponent,
  ],
  exports: [FileInputComponent, Viewer3dComponent, MyFileInputComponent],
})
export class AppComponentsModule {}
