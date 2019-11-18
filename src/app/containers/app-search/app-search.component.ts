import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EchoesState } from '@core/store';

// selectors
import * as fromUserProfile from '@core/store/user-profile';
import * as fromPlayerSearch from '@core/store/player-search';
import { UpdateQueryFilter } from '@core/store/player-search';
import { INavigateEvent } from './search-navigator/search-navigator.component';

@Component({
  selector: 'app-search',
  styleUrls: ['./app-search.scss'],
  template: `
    <article
      infiniteScroll
      [infiniteScrollDistance]="2"
      [infiniteScrollDisabled]="currentPlaylist$ | async"
      (scrolled)="searchMore()"
      [immediateCheck]="true"
    >
      <app-navbar>
        <div class="navbar-header">
          <player-search
            [query]="query$ | async"
            [searchParams]="queryParams$ | async"
            (queryChange)="resetPageToken($event)"
            (paramsChange)="updateParams($event)"
            (search)="search($event)"
          ></player-search>
        </div>
        <section class="is-flex-row is-content-aligned-h">
          <search-navigator
            (navigated)="handleNavigateChange($event)"
          ></search-navigator>
        </section>
      </app-navbar>
      <router-outlet></router-outlet>
    </article>
  `
})
export class AppSearchComponent implements OnInit {
  query$ = this.store.pipe(select(fromPlayerSearch.getQuery));
  currentPlaylist$ = this.store.pipe(
    select(fromUserProfile.getUserViewPlaylist)
  );
  queryParams$ = this.store.pipe(select(fromPlayerSearch.getQueryParams));
  presets$ = this.store.pipe(select(fromPlayerSearch.getPresets));

  constructor(
    private store: Store<EchoesState>,
    private playerSearchActions: fromPlayerSearch.PlayerSearchActions
  ) {}

  ngOnInit() {}

  search(query: string) {
    if (!query.hasOwnProperty('isTrusted')) {
      this.store.dispatch(this.playerSearchActions.searchNewQuery(query));
    }
  }

  resetPageToken(query: string) {
    this.store.dispatch(this.playerSearchActions.resetPageToken());
    this.store.dispatch(new fromPlayerSearch.UpdateQueryAction(query));
  }

  searchMore() {
    this.store.dispatch(this.playerSearchActions.searchMoreForQuery());
  }

  updateParams(queryParams: any) {
    this.store.dispatch(new UpdateQueryFilter(queryParams));
  }

  handleNavigateChange({ params: { filter } }: INavigateEvent) {
    this.store.dispatch(
      this.playerSearchActions.updateQueryParam({ preset: filter })
    );
  }
}
