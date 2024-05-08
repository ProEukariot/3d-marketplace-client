import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
  private _text: string = '';
  // hide = true;

  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      // this.hide = !value;
      this.cdr.detectChanges();
    }
  }

  get text() {
    return this._text;
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
