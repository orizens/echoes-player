import { Route } from '@angular/router';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import './navigator.scss';

@Component({
  selector: 'navigator',
  template: `
  <ul class="nav nav-list nicer-ux library-nav navigator" navigator>
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
export class Navigator implements OnInit {
  private routes = [
    { link: '/', icon: 'fa fa-music', label: 'Explore' },
    { link: '/user', icon: 'fa fa-heart', label: 'My Profile' }
  ];

  constructor() { }

  ngOnInit() {
  }
}
