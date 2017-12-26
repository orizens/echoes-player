import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '@core/store';

import { NowPlaylistActions } from '@core/store/now-playlist';
// selectors
import * as UserProfile from '@core/store/user-profile';
import * as PlayerSearch from '@core/store/player-search';

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
      <button-group class="nav-toolbar"
        [buttons]="presets$ | async"
        [selectedButton]="queryParamPreset$ | async"
        (buttonClick)="updatePreset($event)"
      ></button-group>
      <search-navigator></search-navigator>
    </app-navbar>
    <router-outlet></router-outlet>
    </article>
    `
})
export class AppSearchComponent implements OnInit {
  query$ = this.store.select(PlayerSearch.getQuery);
  currentPlaylist$ = this.store.select(UserProfile.getUserViewPlaylist);
  queryParamPreset$ = this.store.select(PlayerSearch.getQueryParamPreset);
  presets$ = this.store.select(PlayerSearch.getPresets);

  constructor(
    private store: Store<EchoesState>,
    private playerSearchActions: PlayerSearch.PlayerSearchActions
  ) { }

  ngOnInit() { }

  search(query: string) {
    this.store.dispatch(this.playerSearchActions.searchNewQuery(query));
  }

  resetPageToken(query: string) {
    this.store.dispatch(this.playerSearchActions.resetPageToken());
    this.store.dispatch(new PlayerSearch.UpdateQueryAction(query));
  }

  searchMore() {
    this.store.dispatch(this.playerSearchActions.searchMoreForQuery());
  }

  updatePreset(preset: PlayerSearch.IPresetParam) {
    this.store.dispatch(this.playerSearchActions.updateQueryParam({ preset: preset.value }));
  }
}
