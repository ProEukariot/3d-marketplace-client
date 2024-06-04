import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  min,
  of,
  tap,
} from 'rxjs';
import { IntercextionListenerDirective } from 'src/app/shared/directives/intercextion-listener.directive';
import { Model3d } from 'src/app/shared/models/model3d';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';

// *Update* rxjs scan() operator can be used instead of BehaviorSubject for better readability and scalability
// It is possible to use ViewContainerRef (filtering and sorting can be difficult to implement)

export enum ViewType {
  Default,
  User,
}

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
  filteredModels$ = this.models$;

  isFetching: boolean = false;

  filterOptions: { pattern?: string; minRange: number; maxRange: number } = {
    minRange: this.priceRange.min,
    maxRange: this.priceRange.max,
  };

  @Input() viewType = ViewType.Default;

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

  private syncPriceRange() {
    this.filterOptions.minRange = this.priceRange.min;
    this.filterOptions.maxRange = this.priceRange.max;
  }

  applyFilters() {
    this.filteredModels$ = this.models$.pipe(
      tap((m) => {
        console.log(this.filterOptions.maxRange);
      }),
      map((obj) =>
        obj.filter(
          (model) =>
            model.price <= this.filterOptions.maxRange &&
            model.price >= this.filterOptions.minRange &&
            new RegExp(this.filterOptions.pattern || '').test(model.name)
        )
      ),
      tap((m) => {
        console.log('ttt', m);
      })
    );
  }

  ngOnInit(): void {
    this.viewType = this.route.snapshot.data['viewType'];

    this.cursorSub = this.models$.subscribe((items) => {
      this.cursor = items[items.length - 1]?.id;
    });

    this.models3dService.getMinMaxPrice().subscribe((range) => {
      this.priceRange = range;
      this.syncPriceRange();
    });
  }

  ngOnDestroy(): void {
    this.cursorSub.unsubscribe();
  }

  onCardClick(id: string) {
    this.router.navigate(['/explore', id]);
  }

  onScroll() {
    const limit = 4;

    this.isFetching = true;
    this.loaderService.show();

    let get3dModels;

    switch (this.viewType) {
      case ViewType.User:
        get3dModels = this.models3dService.getSubscribed3dModels.bind(
          this.models3dService
        );
        break;

      default:
        get3dModels = this.models3dService.get3dModels.bind(
          this.models3dService
        );
        break;
    }

    get3dModels({ limit, cursor: this.cursor }, this.filterOptions).subscribe(
      (items) => {
        const currentItems = this.modelsSubject.getValue();

        this.modelsSubject.next([...currentItems, ...items]);

        this.isFetching = false;
        this.loaderService.hide();

        // if (items.length < 1) {
        //   this.intercextionListenerDirective.unsubscribe();
        // }
      }
    );
  }
}
