import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';

import { NowPlaylistActions } from "../core/store/now-playlist";
import { PlayerActions } from "../core/store/youtube-player";
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { PlayerSearch } from '../core/store/player-search';
import { EchoesVideos } from '../core/store/youtube-videos';

import { PlayerSearch as PlayerSearchComponent } from './player-search.component';
import { YoutubeList } from '../core/components/youtube-list/youtube-list';
import './youtube-videos.less';

@Component({
  selector: 'youtube-videos.youtube-videos',
  directives: [
    YoutubeList
  ],
  template: `
    <nav class="navbar col-xs-12" player-resizer="fullscreen">
      <div class="navbar-header pull-left">
        <player-search
          [query]="playerSearch$ | async"
          (change)="resetPageToken()"
          (search)="search($event)"
        ></player-search>
      </div>
      <div class="pull-right">
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </nav>
    <section class="videos-list">
      <youtube-list
        [list]="videos$ | async"
        (play)="playSelectedVideo($event)"
        (queue)="queueSelectedVideo($event)"
      ></youtube-list>
    </section>
  `
})
export class YoutubeVideos implements OnInit {
  videos$: Observable<EchoesVideos>;
  playerSearch$: Observable<PlayerSearch>;

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private playerActions: PlayerActions,
    public youtubePlayer: YoutubePlayerService
  ) {
    this.videos$ = store.select(state => state.videos);
    this.playerSearch$ = store.select(state => state.search)
  }

  ngOnInit(){
    this.playerSearch$
      .take(1)
      .subscribe(ps => this.search(ps.query))
  }

  search (query: string) {
    if (query.length) {
      this.youtubeSearch.search(query, false);
    }
  }

  playSelectedVideo (media: GoogleApiYouTubeSearchResource) {
    this.store.dispatch(this.playerActions.loadAndPlay(media));
    this.nowPlaylistService.updateIndexByMedia(media.id.videoId);
    this.store.dispatch(this.nowPlaylistActions.queueLoadVideo(media))
  }

  queueSelectedVideo (media: GoogleApiYouTubeSearchResource) {
    this.store.dispatch(this.nowPlaylistActions.queueLoadVideo(media));
  }

  resetPageToken() {
    this.youtubeSearch.resetPageToken();
  }
}
