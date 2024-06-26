import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { ACCESS_TOKEN } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly storageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.get(ACCESS_TOKEN);

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }
}
