import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop';
import { FileValueAccessor } from './FileValueAccessor';

@NgModule({
  declarations: [DragAndDropDirective, FileValueAccessor],
  imports: [CommonModule],
  exports: [DragAndDropDirective, FileValueAccessor],
})
export class AppDirectivesModule {}
