import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

export class FileDroppedEvent {
  files!: FileList;
}

@Directive({
  selector: '[dragAndDrop]',
})
export class DragAndDropDirective {
  @Output() fileDropped = new EventEmitter<FileDroppedEvent>();

  @HostBinding('class.file-over')
  fileOver: Boolean = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      let event = new FileDroppedEvent();
      event.files = files;

      this.fileDropped.emit(event);
    }
  }
}
