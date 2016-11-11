import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';

import { NowPlaylistActions } from '../core/store/now-playlist';
import { PlayerActions } from '../core/store/youtube-player';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { PlayerSearch, PlayerSearchActions } from '../core/store/player-search';
import { EchoesVideos } from '../core/store/youtube-videos';
import { AppLayoutActions } from '../core/store/app-layout';

import './youtube-videos.less';

@Component({
  selector: 'youtube-videos',
  template: `
  <article
    infinite-scroll
    [infiniteScrollDistance]="2"
    (scrolled)="searchMore()"
    [immediateCheck]="true">
    <nav class="navbar navbar-fixed-top">
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
      <div class="btn-group btn-group-sm navbar-btn nav-toolbar">
        <button class="btn btn-default" 
          [class.active]="(playerSearch$ | async).queryParams.preset === ''"
          (click)="updatePreset('')">
          Any
        </button>
        <button class="btn btn-default" 
          [class.active]="(playerSearch$ | async).queryParams.preset === 'full album'"
          (click)="updatePreset('full album')">
          Albums
        </button>
        <button class="btn btn-default" 
          [class.active]="(playerSearch$ | async).queryParams.preset === 'live'"
          (click)="updatePreset('live')">
          Live
        </button>
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
export class YoutubeVideosComponent implements OnInit {
  videos$: Observable<EchoesVideos>;
  playerSearch$: Observable<PlayerSearch>;
  unsubscribePlayerSearch: Subscription;

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private playerActions: PlayerActions,
    public youtubePlayer: YoutubePlayerService,
    private appLayoutActions: AppLayoutActions,
    private playerSearchActions: PlayerSearchActions
  ) {
    this.videos$ = store.select(state => state.videos);
    this.playerSearch$ = store.select(state => state.search);
  }

  ngOnInit() {
    this.search(this.searchQuery);
  }

  search (query: string) {
    // workaround until switched to new form
    if (!query.hasOwnProperty('isTrusted')) {
      this.youtubeSearch.search(query, false, this.searchParams);
    }
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
    this.youtubeSearch.searchMore(this.searchParams);
  }

  toggleSidebar() {
    return this.store.dispatch(this.appLayoutActions.toggleSidebar());
  }

  updatePreset(preset: string) {
    this.youtubeSearch.setPreset(preset);
    this.youtubeSearch.search(this.searchQuery, false, this.searchParams);
  }

  get searchParams () {
    let params;
    this.playerSearch$.take(1).subscribe(ps => params = ps.queryParams);
    return params;
  }

  get searchQuery () {
    let query;
    this.playerSearch$.take(1).subscribe(ps => query = ps.query);
    return query;
  }
}
