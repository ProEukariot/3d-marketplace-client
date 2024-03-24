import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appDisplayPassword]',
  exportAs: 'appDisplayPassword'
})
export class DisplayPasswordDirective {
  @Input() isVisible = false;

  constructor(private elementRef: ElementRef) {}

  @HostBinding('type')
  get type() {
    return this.isVisible ? 'text' : 'password';
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
}
