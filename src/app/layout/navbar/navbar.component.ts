import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  opened: boolean = false;
  isLoggedIn: boolean = false;
  authSubscription!: Subscription;

  @Input() links: { label: string; link: string }[] = [
    { label: 'Home', link: '/home' },
    { label: 'Explore', link: '/explore' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle() {
    this.opened = !this.opened;
  }

  onLogout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/explore');
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
