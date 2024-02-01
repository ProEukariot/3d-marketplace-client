import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() links: { label: string; link: string }[] = [
    { label: 'Home', link: '/' },
    { label: 'Explore', link: '/' },
    { label: 'About', link: '/' },
  ];
}
