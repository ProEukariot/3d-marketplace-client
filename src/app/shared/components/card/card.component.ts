import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Model3d } from '../../models/model3d';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ICard } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input({ required: true }) model!: ICard;
  @Output() click = new EventEmitter<MouseEvent>();

  constructor() {}
}
