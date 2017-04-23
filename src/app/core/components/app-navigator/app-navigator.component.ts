import { Route } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

// import './navigator.scss';

@Component({
  selector: 'app-navigator',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app-navigator.scss' ],
  template: `
  <ul class="nav nav-list nicer-ux library-nav navigator"
    [class.closed]="closed">
    <li *ngFor="let route of routes"
      routerLinkActive="active" 
      [routerLinkActiveOptions]="{ exact: true }"
      >
      <a routerLink="{{ route.link }}">
        <i class="{{ route.icon }}"></i>
        <span class="text">{{ route.label }}</span>
      </a>
    </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input() closed = false;

  public routes = [
    { link: '/', icon: 'fa fa-music', label: 'Explore' },
    { link: '/user', icon: 'fa fa-heart', label: 'My Profile' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
