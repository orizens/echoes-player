import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { CSearchTypes, CPresetTypes } from '@core/store/player-search';

@Component({
  selector: 'search-navigator',
  styleUrls: ['./search-navigator.component.scss'],
  template: `
    <ul class="nav nav-tabs search-selector" role="tablist">
      <li *ngFor="let search of searchTypes" routerLinkActive="active">
        <a
          [routerLink]="search.link"
          [queryParams]="search.params"
          class="search-filter"
          (click)="handleRouteClick(search)"
          >{{ search.label }}</a
        >
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchNavigatorComponent implements OnInit {
  searchTypes = [
    {
      label: 'Videos',
      link: `/search/videos`,
      params: { filter: '' },
      type: CSearchTypes.VIDEO
    },
    {
      label: 'Playlists',
      link: '/search/playlists',
      params: { filter: '' },
      type: CSearchTypes.PLAYLIST
    },
    {
      label: 'Albums',
      link: `/search/videos`,
      params: { filter: CPresetTypes.FULL_ALBUMS },
      type: CSearchTypes.VIDEO
    },
    {
      label: 'Live',
      link: `/search/videos`,
      params: { filter: CPresetTypes.LIVE },
      type: CSearchTypes.VIDEO
    }
  ];

  @Output() navigated = new EventEmitter<INavigateEvent>();

  ngOnInit() {}

  handleRouteClick(searchType: {
    label: string;
    link: string;
    type: CSearchTypes;
  }) {
    // this.navigated.emit(searchType);
  }
}

export interface INavigateEvent {
  params: {
    filter: string;
  };
  type: CSearchTypes;
}
