import { Injectable } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, map, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject(false);
  private _hideLoaderEvents$!: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;

  public isLoading$!: Observable<boolean>;

  constructor(private readonly router: Router) {
    this._showLoaderEvents$ = router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map(() => true)
    );

    this._hideLoaderEvents$ = router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map(() => false)
    );

    this.isLoading$ = merge(
      this._showLoaderEvents$,
      this._hideLoaderEvents$,
      this.isLoadingSubject.asObservable()
    );
  }

  show() {
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.isLoadingSubject.next(false);
  }
}
