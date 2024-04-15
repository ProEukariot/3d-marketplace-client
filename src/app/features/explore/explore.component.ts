import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IntercextionListenerDirective } from 'src/app/shared/directives/intercextion-listener.directive';
import { Model3d } from 'src/app/shared/models/model3d';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Model3dService } from 'src/app/shared/services/model3d.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  cursor?: string;
  cursorSub!: Subscription;

  modelsSubject = new BehaviorSubject<Model3d[]>([]);
  models$ = this.modelsSubject.asObservable();

  isFetching: boolean = false;

  @ViewChild(IntercextionListenerDirective, { static: true })
  intercextionListenerDirective!: IntercextionListenerDirective;

  constructor(
    private readonly models3dService: Model3dService,
    public readonly loaderService: LoaderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cursorSub = this.models$.subscribe((items) => {
      this.cursor = items[items.length - 1]?.id;
    });
  }

  ngOnDestroy(): void {
    this.cursorSub.unsubscribe();
  }

  onCardClick(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onScroll() {
    this.isFetching = true;
    this.loaderService.show();

    this.models3dService.get3dModels(this.cursor).subscribe((items) => {
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
