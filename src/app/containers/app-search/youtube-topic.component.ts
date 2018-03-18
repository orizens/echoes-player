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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'youtube-topic',
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
export class YoutubeTopicComponent implements OnInit {
  videos$ = this.store.select(PlayerSearch.getPlayerSearchResults);
  playlistVideos$ = this.store.select(NowPlaylist.getPlaylistVideos);
  loading$ = this.store.select(PlayerSearch.getIsSearching);

  constructor(
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi,
    private router: Router,
    private route: ActivatedRoute,
    private playerSearchActions: PlayerSearch.PlayerSearchActions
  ) { }

  ngOnInit() {
    let genre = this.route.snapshot.url[0].path;

    this.store.dispatch(this.playerSearchActions.updateSearchType(PlayerSearch.CSearchTypes.TOPIC));
    this.store.dispatch(this.playerSearchActions.updateQueryParam({
      topic: PlayerSearch.CTopicIds[genre.toUpperCase()]
    }));
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
