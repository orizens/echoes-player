import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CSearchTypes } from '@core/store/player-search';

@Component({
  selector: 'search-navigator',
  styleUrls: ['./search-navigator.component.scss'],
  template: `
  <ul class="nav nav-tabs search-selector" role="tablist">
    <li *ngFor="let search of searchTypes"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: true }">
      <a routerLink="{{ search.link }}">{{ search.label }}</a>
    </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchNavigatorComponent implements OnInit {
  searchTypes = [
    { label: 'Videos', link: '/search/videos', type: CSearchTypes.VIDEO },
    { label: 'Playlists', link: '/search/playlists', type: CSearchTypes.PLAYLIST },
  ];

  ngOnInit() { }
}
