import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntercextionListenerDirective } from 'src/app/shared/directives/intercextion-listener.directive';
import { Model3d } from 'src/app/shared/models/model3d';
import { Model3dService } from 'src/app/shared/services/model3d.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  page = 1;
  models: Model3d[] = [];

  isFetching: boolean = false;

  @ViewChild(IntercextionListenerDirective, { static: true })
  intercextionListenerDirective!: IntercextionListenerDirective;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly models3dService: Model3dService
  ) {}

  ngOnInit(): void {
    this.models3dService.loadModels3d(this.page).subscribe((items) => {
      this.models = items;
    });
  }

  onCardClick(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onScroll() {
    this.isFetching = true;
    this.models3dService.loadModels3d(++this.page).subscribe((items) => {
      this.models.push(...items);
      this.isFetching = false;

      if (items.length < 1) {
        this.intercextionListenerDirective.unsubscribe();
      }
    });
  }
}
