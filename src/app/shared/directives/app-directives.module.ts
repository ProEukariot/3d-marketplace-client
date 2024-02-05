import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop';

@NgModule({
  declarations: [DragAndDropDirective],
  imports: [CommonModule],
  exports: [DragAndDropDirective],
})
export class AppDirectivesModule {}
