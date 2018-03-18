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
    { label: 'Pop', link: '/genre/pop', type: CSearchTypes.TOPIC },
    { label: 'R&B', link: '/genre/rnb', type: CSearchTypes.TOPIC },
    { label: 'Hip Hop', link: '/genre/hiphop', type: CSearchTypes.TOPIC },
    { label: 'Rock', link: '/genre/rock', type: CSearchTypes.TOPIC },    
    { label: 'Jazz', link: '/genre/jazz', type: CSearchTypes.TOPIC },
    { label: 'Electronic', link: '/genre/electronic', type: CSearchTypes.TOPIC },
  ];

  ngOnInit() { }
}
