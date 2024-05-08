import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { FileValueAccessor } from './file-value-accessor.directive';
import { IntercextionListenerDirective } from './intercextion-listener.directive';
import { DisplayPasswordDirective } from './display-password.directive';
import { ControlErrorsDirective } from './control-errors.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@NgModule({
  declarations: [
    DragAndDropDirective,
    FileValueAccessor,
    IntercextionListenerDirective,
    DisplayPasswordDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorContainerDirective,
  ],
  imports: [CommonModule],
  exports: [
    DragAndDropDirective,
    FileValueAccessor,
    IntercextionListenerDirective,
    DisplayPasswordDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorContainerDirective,
  ],
})
export class AppDirectivesModule {}
