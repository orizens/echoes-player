import { PlayerSearchActions, CSearchTypes } from '../../core/store/player-search';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../core/store';

// actions
import { NowPlaylistActions, LoadPlaylistAction, PlayPlaylistAction } from '../../core/store/now-playlist';
import { ActionTypes } from '../../core/store/app-player';
// selectors
import { getPlayerSearchResults$, getNowPlaylist$ } from '../../core/store/reducers';
import { getIsSearching$ } from '../../core/store/player-search';
import { AppPlayerApi } from '../../core/api/app-player.api';

import { fadeInAnimation } from '../../shared/animations/fade-in.animation';

@Component({
  selector: 'youtube-playlists',
  styles: [
    `
    :host .youtube-items-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  `
  ],
  animations: [fadeInAnimation],
  template: `
  <loader [message]="'Loading Awesome Playlists Results'" [loading]="isSearching$ | async"></loader>
  <section class="videos-list">
    <div class="list-unstyled ux-maker youtube-items-container clearfix">
      <youtube-playlist
        [@fadeIn]
        *ngFor="let playlist of results$ | async"
        link=""
        [media]="playlist"
        (play)="playPlaylist(playlist)"
        (queue)="queueSelectedPlaylist(playlist)">
      </youtube-playlist>
    </div>
  </section>
  `
})
export class YoutubePlaylistsComponent implements OnInit {
  results$ = this.store.let(getPlayerSearchResults$);
  isSearching$ = this.store.let(getIsSearching$);

  constructor(
    private store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private appPlayerActions: ActionTypes,
    private playerSearchActions: PlayerSearchActions,
    private appPlayerApi: AppPlayerApi
  ) {}

  ngOnInit() {
    this.store.dispatch(this.playerSearchActions.updateSearchType(CSearchTypes.PLAYLIST));
    this.store.dispatch(PlayerSearchActions.PLAYLISTS_SEARCH_START.creator());
  }

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    // this.store.dispatch(new PlayPlaylistAction(media.id));
    this.appPlayerApi.playPlaylist(media);
  }

  queueSelectedPlaylist(media: GoogleApiYouTubePlaylistResource) {
    // this.store.dispatch(new LoadPlaylistAction(media.id));
    this.appPlayerApi.queuePlaylist(media);
  }
}
