import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ParseUrlService } from './parse-api-url.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private readonly http: HttpClient,
    private readonly urlService: ParseUrlService
  ) {}

  createCheckoutSession(id: string) {    
    return this.http.post<{ url: string }>(
      this.urlService.apiUrl(['checkout', 'create-session']),
      { id }
    );
  }
}
