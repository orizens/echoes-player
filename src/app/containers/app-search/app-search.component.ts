import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../core/store';

import { NowPlaylistActions } from '../../core/store/now-playlist';
import { IPresetParam, PlayerSearchActions, UpdateQueryAction } from '../../core/store/player-search';
// selectors
import { getUserViewPlaylist$ } from '../../core/store/user-profile';
import { getQuery$, getQueryParamPreset$, getPresets$ } from '../../core/store/player-search';
import { PlayerSearchService } from '../../core/services/player-search.service';

@Component({
  selector: 'app-search',
  styleUrls: [ './app-search.scss' ],
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
  // query$ = this.store.let(getQuery$);
  query$ = this.playerSearchService.playerSearch$.map(search => search.query);

  currentPlaylist$ = this.store.let(getUserViewPlaylist$);
  queryParamPreset$ = this.store.let(getQueryParamPreset$);
  presets$ = this.store.let(getPresets$);

  constructor(
    private store: Store<EchoesState>,
    private playerSearchService: PlayerSearchService,
    private playerSearchActions: PlayerSearchActions
  ) { }

  ngOnInit() {}

  search (query: string) {
    // this.store.dispatch(this.playerSearchActions.searchNewQuery(query));
    this.playerSearchService.searchNewQuery(query);
  }

  resetPageToken(query: string) {
    // this.store.dispatch(this.playerSearchActions.resetPageToken());
    this.playerSearchService.resetPageToken();

    // this.store.dispatch(new UpdateQueryAction(query));
    this.playerSearchService.updateQueryAction(query);

  }

  searchMore () {
    // this.store.dispatch(this.playerSearchActions.searchMoreForQuery());
    this.playerSearchService.searchMoreForQuery();
  }

  updatePreset(preset: IPresetParam) {
    // this.store.dispatch(this.playerSearchActions.updateQueryParam({ preset: preset.value }));
    this.playerSearchService.updateQueryParam({ preset: preset.value });

  }
}
