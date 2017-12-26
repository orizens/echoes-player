import * as PlayerSearch from '@core/store/player-search';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '@core/store';

// actions
import { NowPlaylistActions } from '@core/store/now-playlist';
import { ActionTypes } from '@core/store/app-player';
import { AppPlayerApi } from '@core/api/app-player.api';

// selectors
import * as NowPlaylist from '@core/store/now-playlist';

@Component({
  selector: 'youtube-videos',
  styleUrls: ['./youtube-videos.scss'],
  template: `
    <loader [message]="'Loading Awesome Media Results'" [loading]="loading$ | async"></loader>
    <youtube-list
      [list]="videos$ | async"
      [queued]="playlistVideos$ | async"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
    ></youtube-list>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$ = this.store.select(PlayerSearch.getPlayerSearchResults);
  playlistVideos$ = this.store.select(NowPlaylist.getPlaylistVideos);
  loading$ = this.store.select(PlayerSearch.getIsSearching);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi,
    private playerSearchActions: PlayerSearch.PlayerSearchActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.playerSearchActions.updateSearchType(PlayerSearch.CSearchTypes.VIDEO));
    this.store.dispatch(this.playerSearchActions.searchCurrentQuery());
  }

  playSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo(media);
  }

  queueSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideo(media);
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.removeVideoFromPlaylist(media);
  }
}
