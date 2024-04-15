import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Observable, Subscription, of } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';

type NavLink = { text: string; path: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isLoggedIn$ = of(false);
  

  navLinks: Array<NavLink> = [
    { text: 'Explore', path: '/explore' },
    { text: 'Home', path: '/home' },
  ];

  constructor(
    private readonly authService: AuthService,
    public readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.clearToken();
  }
}
