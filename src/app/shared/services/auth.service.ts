import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Token } from '../types/token';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export type RegisterDto = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject(
    !!this.localService.get(ACCESS_TOKEN)
  );

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly localService: LocalStorageService
  ) {}

  getToken() {
    return this.localService.get(ACCESS_TOKEN);
  }

  signUp(userDto: RegisterDto) {
    return this.http.post<Token>(`${this.apiUrl}auth/signup`, userDto);
  }

  signIn(userDto: LoginDto) {
    return this.http.post<Token>(`${this.apiUrl}auth/signin`, userDto);
  }

  saveToken(token: Token) {
    this.localService.set(ACCESS_TOKEN, token.value);
    this.isLoggedInSubject.next(true);
  }

  clearToken() {
    this.localService.remove(ACCESS_TOKEN);
    this.isLoggedInSubject.next(false);
  }
}
