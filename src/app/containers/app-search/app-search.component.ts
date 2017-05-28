import { getUserViewPlaylist$ } from '../../core/store/user-profile/user-profile.selectors';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../core/store';

import { NowPlaylistActions } from '../../core/store/now-playlist';
import { AppPlayerActions } from '../../core/store/app-player';
import { IPresetParam, PlayerSearchActions, search, SearchTypes } from '../../core/store/player-search';
import { AppLayoutActions } from '../../core/store/app-layout';
// selectors
import { getPlayerSearch$ } from '../../core/store/reducers';

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
          [query]="playerSearch$ | async"
          (change)="resetPageToken()"
          (search)="search($event)"
        ></player-search>
      </div>
      <button-group class="nav-toolbar"
        [buttons]="presets"
        [selectedButton]="(playerSearch$ | async).queryParams.preset"
        (buttonClick)="updatePreset($event)"
      ></button-group>
      <ul class="nav nav-tabs search-selector" role="tablist">
        <li *ngFor="let search of searchTypes"
          routerLinkActive="active" 
          [routerLinkActiveOptions]="{ exact: true }">
          <a routerLink="{{ search.link }}">{{ search.label }}</a>
        </li>
        <li *ngIf="currentPlaylist$ | async"
          class="active">
          <a><i class="fa fa-chevron-right"></i> Playlist View</a>
        </li>
      </ul>
    </app-navbar>
    <loading-indicator [isLoading]="(playerSearch$ | async).isSearching"></loading-indicator>
    <router-outlet></router-outlet>
  </article>
  `
})
export class AppSearchComponent implements OnInit {
  playerSearch$ = this.store.let(getPlayerSearch$);
  currentPlaylist$ = this.store.let(getUserViewPlaylist$);

  presets: IPresetParam[] = [
    { label: 'Any', value: '' },
    { label: 'Albums', value: 'full album' },
    { label: 'Live', value: 'live' }
  ];

  searchTypes = [
    { label: 'Videos', link: '/search/videos', type: SearchTypes.VIDEO },
    { label: 'Playlists', link: '/search/playlists', type: SearchTypes.PLAYLIST },
  ];

  constructor(
    private store: Store<EchoesState>,
    private playerSearchActions: PlayerSearchActions
  ) { }

  ngOnInit() {}

  search (query: string) {
    this.store.dispatch(this.playerSearchActions.searchNewQuery(query));
  }

  resetPageToken() {
    this.store.dispatch(this.playerSearchActions.resetPageToken());
  }

  searchMore () {
    this.store.dispatch(this.playerSearchActions.searchMoreForQuery());
  }

  updatePreset(preset: IPresetParam) {
    this.store.dispatch(this.playerSearchActions.updateQueryParam({ preset: preset.value }));
  }
}
