import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { CSearchTypes, CPresetTypes, IQueryParams } from '@core/store/player-search';

interface TSearchType {
  label: string;
  link: string;
  params: { filter: string };
  type: CSearchTypes;
}

@Component({
  selector: 'search-navigator',
  styleUrls: ['./search-navigator.component.scss'],
  template: `
    <ul class="nav nav-tabs search-selector" role="tablist">
      <li *ngFor="let search of searchTypes" [ngClass]="{ 'active': isActive(search)}">
        <a
          [routerLink]="search.link"
          [queryParams]="search.params"
          class="search-filter"
          >{{ search.label }}</a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchNavigatorComponent implements OnInit {
  searchTypes: TSearchType[] = [
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
  @Input() queryParams: IQueryParams;
  @Input() searchType: CSearchTypes = CSearchTypes.VIDEO;
  @Output() navigated = new EventEmitter<INavigateEvent>();

  ngOnInit() { }

  handleRouteClick(searchType: {
    label: string;
    link: string;
    type: CSearchTypes;
  }) {
    // this.navigated.emit(searchType);
  }

  isActive({ type, params }: TSearchType) {
    const { queryParams: { preset }, searchType } = this;
    const currentPreset = preset === undefined ? '' : preset;
    return type === searchType && params.filter === currentPreset
  }

}

export interface INavigateEvent {
  params: {
    filter: string;
  };
  type: CSearchTypes;
}
