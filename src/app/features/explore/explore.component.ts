import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { Model3d } from 'src/app/shared/models/model3d';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  models!: Observable<Model3d[]>;

  MODELS = [
    { id: '1', name: 'Name 1', price: 1 },
    { id: '2', name: 'Name 2', price: 2 },
    { id: '3', name: 'Name 3', price: 3 },
    { id: '4', name: 'Name 4', price: 4 },
    { id: '5', name: 'Name 5', price: 5 },
    { id: '6', name: 'Name 6', price: 6 },
    { id: '7', name: 'Name 7', price: 7 },
    { id: '8', name: 'Name 8', price: 8 },
  ];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.models = of(this.MODELS);
  }

  onCardClick(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
