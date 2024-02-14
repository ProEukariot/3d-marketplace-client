import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input/file-input.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AppDirectivesModule } from '../directives/app-directives.module';
import { DndFileInputComponent } from './dnd-file-input/dnd-file-input.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    AppDirectivesModule,
    FileInputComponent,
    DndFileInputComponent,
  ],
  exports: [FileInputComponent, DndFileInputComponent],
})
export class AppComponentsModule {}
