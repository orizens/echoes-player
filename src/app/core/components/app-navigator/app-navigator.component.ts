import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CSearchTypes } from '../../models/player-search';

@Component({
  selector: 'app-navigator',
  styleUrls: [ './app-navigator.scss' ],
  template: `
  <div class="list-group"
    [class.closed]="closed">
    <button class="list-group-item ux-maker"
      *ngFor="let route of routes;"
      (click)="go(route.link)">
      <i class="{{ route.icon }}"></i>
      <span class="text">{{ route.label }}</span>
    </button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavigatorComponent implements OnInit {
  @Input() closed = false;
  @Input() searchType = CSearchTypes.VIDEO;

  public routes = [
    { link: 'search', icon: 'fa fa-music', label: 'Explore' }
    // { link: '/user', icon: 'fa fa-heart', label: 'My Profile' }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  go(link) {
    this.router.navigate([`/${link}/${this.searchType}s`]);
  }
}
