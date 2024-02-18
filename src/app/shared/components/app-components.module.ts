import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AppDirectivesModule } from '../directives/app-directives.module';
import { DndFileInputComponent } from './dnd-file-input/dnd-file-input.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    AppDirectivesModule,
    DndFileInputComponent,
    SnackbarComponent,
  ],
  exports: [DndFileInputComponent],
})
export class AppComponentsModule {}
