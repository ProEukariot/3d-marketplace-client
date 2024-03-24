import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { FileValueAccessor } from './file-value-accessor.directive';
import { IntercextionListenerDirective } from './intercextion-listener.directive';
import { DisplayPasswordDirective } from './display-password.directive';

@NgModule({
  declarations: [
    DragAndDropDirective,
    FileValueAccessor,
    IntercextionListenerDirective,
    DisplayPasswordDirective,
  ],
  imports: [CommonModule],
  exports: [
    DragAndDropDirective,
    FileValueAccessor,
    IntercextionListenerDirective,
    DisplayPasswordDirective,
  ],
})
export class AppDirectivesModule {}
