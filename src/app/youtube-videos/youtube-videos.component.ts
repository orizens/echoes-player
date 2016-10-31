import {
  Component, ChangeDetectionStrategy, OnInit,
  EventEmitter, Input, Output
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';

import { NowPlaylistActions } from '../core/store/now-playlist';
import { PlayerActions } from '../core/store/youtube-player';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { PlayerSearch } from '../core/store/player-search';
import { EchoesVideos } from '../core/store/youtube-videos';
import { AppLayoutActions } from '../core/store/app-layout';

import './youtube-videos.less';

@Component({
  selector: 'youtube-videos.youtube-videos',
  template: `
  <article
    infinite-scroll
    [infiniteScrollDistance]="2"
    (scrolled)="searchMore()"
    [immediateCheck]="true">
    <nav class="navbar col-xs-12">
      <div class="navbar-header">
        <button class="btn btn-navbar btn-link ux-maker pull-left sidebar-toggle"
          (click)="toggleSidebar()">
          <i class="fa fa-bars"></i>
        </button>
        <player-search
          [query]="playerSearch$ | async"
          (change)="resetPageToken()"
          (search)="search($event)"
        ></player-search>
      </div>
    </nav>
    <youtube-list
      [list]="videos$ | async"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
    ></youtube-list>
  </article>
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
    public youtubePlayer: YoutubePlayerService,
    private appLayoutActions: AppLayoutActions
  ) {
    this.videos$ = store.select(state => state.videos);
    this.playerSearch$ = store.select(state => state.search);
  }

  ngOnInit() {
    this.playerSearch$
      .take(1)
      .subscribe(ps => this.search(ps.query));
  }

  search (query: string) {
    // workaround until switched to new form
    if (!query.hasOwnProperty('isTrusted')) this.youtubeSearch.search(query, false);
  }

  playSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.playerActions.loadAndPlay(media));
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
    this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }

  queueSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }

  resetPageToken() {
    this.youtubeSearch.resetPageToken();
  }

  searchMore () {
    this.youtubeSearch.searchMore();
  }

  toggleSidebar() {
    return this.store.dispatch(this.appLayoutActions.toggleSidebar());
  }
}
