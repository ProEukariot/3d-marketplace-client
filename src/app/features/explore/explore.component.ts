import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, map, min, of } from 'rxjs';
import { IntercextionListenerDirective } from 'src/app/shared/directives/intercextion-listener.directive';
import { Model3d } from 'src/app/shared/models/model3d';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';

// It is possible to use ViewContainerRef (filtering and sorting can be difficult to implement)

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  cursor?: string;
  cursorSub!: Subscription;

  priceRange: { min: number; max: number } = {
    min: 0,
    max: 100_000,
  };

  modelsSubject = new BehaviorSubject<Model3d[]>([]);
  models$ = this.modelsSubject.asObservable();

  isFetching: boolean = false;

  filterOptions: { pattern?: string; minRange?: number; maxRange?: number } = {
    minRange: this.priceRange.min,
    maxRange: this.priceRange.max,
  };

  @ViewChild(IntercextionListenerDirective, { static: true })
  intercextionListenerDirective!: IntercextionListenerDirective;

  constructor(
    private readonly models3dService: Model3dService,
    public readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  ngOnInit(): void {
    this.cursorSub = this.models$.subscribe((items) => {
      this.cursor = items[items.length - 1]?.id;
    });

    this.models3dService.getMinMaxPrice().subscribe((range) => {
      this.priceRange = range;
    });
  }

  ngOnDestroy(): void {
    this.cursorSub.unsubscribe();
  }

  onCardClick(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onScroll() {
    const limit = 4;

    this.isFetching = true;
    this.loaderService.show();

    this.models3dService
      .get3dModels({ limit, cursor: this.cursor }, this.filterOptions)
      .subscribe((items) => {
        const currentItems = this.modelsSubject.getValue();

        this.modelsSubject.next([...currentItems, ...items]);

        this.isFetching = false;
        this.loaderService.hide();

        if (items.length < 1) {
          this.intercextionListenerDirective.unsubscribe();
        }
      });
  }
}
