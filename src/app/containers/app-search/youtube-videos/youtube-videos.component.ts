import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '@core/store';

// actions
import * as fromNowPlaylist from '@core/store/now-playlist';
import * as fromPlayer from '@core/store/app-player';
import * as fromPlayerSearch from '@core/store/player-search';
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
      [queued]="playlistIds$ | async"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
    ></youtube-list>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$ = this.store.select(fromPlayerSearch.getPlayerSearchResults);
  playlistIds$ = this.store.select(NowPlaylist.getPlaylistMediaIds);
  loading$ = this.store.select(fromPlayerSearch.getIsSearching);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new fromPlayerSearch.UpdateSearchType(fromPlayerSearch.CSearchTypes.VIDEO)
    );
    this.store.dispatch(new fromPlayerSearch.SearchCurrentQuery());
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
