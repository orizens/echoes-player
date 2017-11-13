import { PlayerSearchActions, CSearchTypes } from '../../core/store/player-search';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../core/store';

// actions
import { NowPlaylistActions } from '../../core/store/now-playlist';
import { ActionTypes } from '../../core/store/app-player';
import { AppPlayerApi } from '../../core/api/app-player.api';

// selectors
import { getPlayerSearchResults$, getNowPlaylist$ } from '../../core/store/reducers';
import { getPlaylistVideos$ } from '../../core/store/now-playlist';
import { getIsSearching$ } from '../../core/store/player-search';
import { PlayerSearchService } from "../../core/services/player-search.service";

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

  // videos$ = this.store.let(getPlayerSearchResults$);
  // loading$ = this.store.let(getIsSearching$);

  videos$ = this.playerSearchService.playerSearch$.map(search => search.results);
  loading$ = this.playerSearchService.playerSearch$.map(search => search.isSearching);

  playlistVideos$ = this.store.let(getPlaylistVideos$);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi,
    private playerSearchActions: PlayerSearchActions,
    private playerSearchService: PlayerSearchService
  ) {}

  ngOnInit() {
    // this.store.dispatch(this.playerSearchActions.updateSearchType(CSearchTypes.VIDEO));
    this.playerSearchService.updateSearchType(CSearchTypes.VIDEO);


    // this.store.dispatch(this.playerSearchActions.searchCurrentQuery());
    this.playerSearchService.searchCurrentQuery();

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
