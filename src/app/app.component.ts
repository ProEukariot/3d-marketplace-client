import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Observable, Subscription } from 'rxjs';

type NavLink = { text: string; path: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  private authSubscription!: Subscription;

  navLinks: Array<NavLink> = [
    { text: 'Explore', path: '/explore' },
    { text: 'Home', path: '/home' },
  ];

  constructor(private readonly authService: AuthService) {}

  logout() {
    this.authService.clearToken();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (value) => (this.isLoggedIn = value)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
