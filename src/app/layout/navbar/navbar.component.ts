import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  opened: boolean = false;

  @Input() links: { label: string; link: string }[] = [
    { label: 'Home', link: '/home' },
    { label: 'Explore', link: '/explore' },
    { label: 'About', link: '/about' },
    { label: 'Profile', link: '/profile' },
  ];

  log() {
    console.log('QQQ');
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle() {
    this.opened = !this.opened;
  }
}
