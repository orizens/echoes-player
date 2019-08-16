import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EchoesState } from '@core/store';

// selectors
import * as UserProfile from '@core/store/user-profile';
import * as fromPlayerSearch from '@core/store/player-search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  styleUrls: ['./app-search.scss'],
  template: `
  <article
    infiniteScroll
    [infiniteScrollDistance]="2"
    [infiniteScrollDisabled]="currentPlaylist$ | async"
    (scrolled)="searchMore()"
    [immediateCheck]="true">
    <app-navbar>
      <div class="navbar-header">
        <player-search
          [query]="query$ | async"
          (queryChange)="resetPageToken($event)"
          (search)="search($event)"
        ></player-search>
      </div>
      <section class="is-flex-row is-content-aligned-h">
        <search-navigator></search-navigator>
      </section>
    </app-navbar>
    <router-outlet></router-outlet>
    </article>
    `
})
export class AppSearchComponent implements OnInit {
  query$ = this.store.pipe(select(fromPlayerSearch.getQuery));
  currentPlaylist$ = this.store.pipe(select(UserProfile.getUserViewPlaylist));
  queryParamPreset$ = this.store.pipe(
    select(fromPlayerSearch.getQueryParamPreset)
  );
  presets$ = this.store.pipe(select(fromPlayerSearch.getPresets));

  constructor(
    private store: Store<EchoesState>,
    private playerSearchActions: fromPlayerSearch.PlayerSearchActions,
    private router: Router
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

  updatePreset(preset: fromPlayerSearch.IPresetParam | any) {
    this.store.dispatch(
      this.playerSearchActions.updateQueryParam({ preset: preset.value })
    );
    this.router.navigate([preset.link]);
  }
}
