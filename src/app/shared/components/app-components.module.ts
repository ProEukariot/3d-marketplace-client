import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AppDirectivesModule } from '../directives/app-directives.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { Viewer3dComponent } from './viewer3d/viewer3d.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { CardComponent } from './card/card.component';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FileInputComponent } from './file-input/file-input.component';

@NgModule({
  declarations: [
    Viewer3dComponent,
    FileInputComponent,
    InputComponent,
    SnackBarComponent,
    CardComponent,
    ControlErrorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppDirectivesModule,
    SnackbarComponent,
    FormsModule,
  ],
  exports: [
    FileInputComponent,
    Viewer3dComponent,
    InputComponent,
    CardComponent,
  ],
})
export class AppComponentsModule {}
