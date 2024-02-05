import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input/file-input.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AppDirectivesModule } from '../directives/app-directives.module';

@NgModule({
  declarations: [FileInputComponent],
  imports: [CommonModule, MaterialModule, AppDirectivesModule],
  exports: [FileInputComponent]
})
export class AppComponentsModule {}
