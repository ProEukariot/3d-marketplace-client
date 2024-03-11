import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appIntercextionListener]',
})
export class IntercextionListenerDirective
  implements AfterViewInit, OnInit, OnDestroy
{
  @Input() root!: HTMLElement;
  @Input() rootMargin!: string;
  @Input() threshold!: number;
  @Input() unobserveOnScroll: boolean = false;

  @Output() onScroll = new EventEmitter<boolean>();
  observer!: IntersectionObserver;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.setIntersectionObserver();
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private setIntersectionObserver() {
    const options = {
      root: this.root || null,
      rootMargin: this.rootMargin || '0px',
      threshold: this.threshold || 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onScroll.emit(true);

          if (this.unobserveOnScroll) {
            this.observer.unobserve(entry.target);
          }
        }
      });
    }, options);
  }

  unsubscribe() {
    this.observer.unobserve(this.element.nativeElement);
  }
}
