import {
  Component, OnInit, EventEmitter,
  Input, Output, ChangeDetectionStrategy
} from '@angular/core';
import './navigator.less';

@Component({
  selector: 'navigator',
  template: `
  <ul id="library-nav" class="nav nav-list nicer-ux library-nav navigator" navigator>
    <li [class.active]="isActive('explore')">
      <a [routerLink]="['']"><i class="fa fa-music"></i>Explore</a>
    </li>
    <li [class.active]="isActive('user')">
      <a [routerLink]="['user']"><i class="fa fa-heart"></i>My Playlists</a>
    </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navigator implements OnInit {
  @Input() route: string;
  // @Output() select = new EventEmitter();
  // @Output() sort = new EventEmitter();
  private activeRoute: string = 'explore';

  constructor() { }

  ngOnInit() {}

  isActive (label: string) {
    return label === this.activeRoute;
  }
}
