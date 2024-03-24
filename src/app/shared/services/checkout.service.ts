import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private readonly http: HttpClient) {}

  createCheckoutSession(itemId: string) {
    const apiUrl = environment.apiUrl;

    return this.http.post<{ url: string }>(`${apiUrl}checkout/create-session`, { id: itemId });
  }
}
