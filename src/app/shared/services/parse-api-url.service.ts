import { Injectable } from '@angular/core';
import { Router, UrlCreationOptions, UrlSerializer } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParseUrlService {
  private _apiUrl = environment.apiUrl;

  constructor(
    private readonly router: Router,
    private readonly serializer: UrlSerializer
  ) {}

  apiUrl(commands: any[], navigationExtras?: UrlCreationOptions | undefined) {
    const tree = this.router.createUrlTree(commands, navigationExtras);

    const serializedTree = this.serializer.serialize(tree);

    return `${this._apiUrl}${serializedTree}`;
  }
}
