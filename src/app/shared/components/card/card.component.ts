import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Model3d } from '../../models/model3d';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ICard } from 'src/app/interfaces/card.interface';
import { Model3dService } from '../../services/model3d.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) model!: ICard;
  @Output() click = new EventEmitter<MouseEvent>();

  public imgUrl$!: Observable<string>;

  constructor(private readonly modelService: Model3dService) {}

  ngOnInit(): void {
    this.imgUrl$ = this.modelService.getModelImagePublicBlobUrl(this.model.id);
  }
}
