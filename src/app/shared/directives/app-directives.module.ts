import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop';
import { FileValueAccessor } from './FileValueAccessor';
import { IntercextionListenerDirective } from './intercextion-listener.directive';

@NgModule({
  declarations: [DragAndDropDirective, FileValueAccessor, IntercextionListenerDirective],
  imports: [CommonModule],
  exports: [DragAndDropDirective, FileValueAccessor, IntercextionListenerDirective],
})
export class AppDirectivesModule {}
