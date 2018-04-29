import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '@core/store';

// actions
import * as fromNowPlaylist from '@core/store/now-playlist';
import * as fromAppPlayer from '@core/store/app-player';
// selectors
import * as fromPlayerSearch from '@core/store/player-search';
import { AppPlayerApi } from '@core/api/app-player.api';

import { fadeInAnimation } from '@shared/animations/fade-in.animation';

@Component({
  selector: 'youtube-playlists',
  animations: [fadeInAnimation],
  template: `
  <loader [message]="'Loading Awesome Playlists Results'" [loading]="isSearching$ | async"></loader>
  <section class="videos-list">
    <div class="ux-maker is-flex-row is-flex-wrap is-content-aligned-h">
      <youtube-playlist class="is-media-responsive"
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
  results$ = this.store.select(fromPlayerSearch.getPlayerSearchResults);
  isSearching$ = this.store.select(fromPlayerSearch.getIsSearching);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new fromPlayerSearch.UpdateSearchType(
        fromPlayerSearch.CSearchTypes.PLAYLIST
      )
    );
    this.store.dispatch(
      fromPlayerSearch.PlayerSearchActions.PLAYLISTS_SEARCH_START.creator()
    );
  }

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.playPlaylist(media);
  }

  queueSelectedPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.queuePlaylist(media);
  }
}
