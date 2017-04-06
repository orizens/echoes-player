import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../core/store';

import { NowPlaylistActions } from '../../core/store/now-playlist';
import { PlayerActions } from '../../core/store/youtube-player';
import { PlayerSearchActions, PresetParam } from '../../core/store/player-search';
import { AppLayoutActions } from '../../core/store/app-layout';
// selectors
import { getPlayerSearch$, getPlayerSearchResults$, getNowPlaylist$ } from '../../core/store/reducers';

@Component({
  selector: 'youtube-videos',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './youtube-videos.scss' ],
  template: `
  <article
    infinite-scroll
    [infiniteScrollDistance]="2"
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
    </app-navbar>
    <loading-indicator [isLoading]="(playerSearch$ | async).isSearching"></loading-indicator>
    <youtube-list
      [list]="videos$ | async"
      [queued]="(playlist$ | async).videos"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
    ></youtube-list>
  </article>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$ = this.store.let(getPlayerSearchResults$);
  playerSearch$ = this.store.let(getPlayerSearch$);
  playlist$ = this.store.let(getNowPlaylist$);
  // @State(getVideos$) videos$;
  // @State(getPlayerSearch$) playerSearch$;

  presets: PresetParam[] = [
    { label: 'Any', value: '' },
    { label: 'Albums', value: 'full album' },
    { label: 'Live', value: 'live' }
  ];

  constructor(
    private store: Store<EchoesState>,

    private nowPlaylistActions: NowPlaylistActions,
    private playerActions: PlayerActions,
    private appLayoutActions: AppLayoutActions,
    private playerSearchActions: PlayerSearchActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.playerSearchActions.searchCurrentQuery());
  }

  search (query: string) {
    this.store.dispatch(this.playerSearchActions.searchNewQuery(query));
  }

  playSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.playerActions.loadAndPlay(media));
    this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }

  queueSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.removeVideo(media));
  }
  resetPageToken() {
    this.store.dispatch(this.playerSearchActions.resetPageToken());
  }

  searchMore () {
    this.store.dispatch(this.playerSearchActions.searchMoreForQuery());
  }

  updatePreset(preset: PresetParam) {
    this.store.dispatch(this.playerSearchActions.updateQueryParam({ preset: preset.value }));
  }
}
