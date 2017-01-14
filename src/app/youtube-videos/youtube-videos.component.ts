import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';

import { NowPlaylistActions } from '../core/store/now-playlist';
import { PlayerActions } from '../core/store/youtube-player';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { PlayerSearchActions, PresetParam } from '../core/store/player-search';
import { AppLayoutActions } from '../core/store/app-layout';
// selectors
import { getVideos$, getPlayerSearch$ } from '../core/store/reducers';
import { getQuery, getQueryParams } from '../core/store/player-search/player-search.reducer';

import './youtube-videos.scss';
import { State } from '../ngrx-state.decorator';

@Component({
  selector: 'youtube-videos',
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
    <youtube-list
      [list]="videos$ | async"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
    ></youtube-list>
  </article>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$ = this.store.let(getVideos$);
  playerSearch$ = this.store.let(getPlayerSearch$);
  // @State(getVideos$) videos$;
  // @State(getPlayerSearch$) playerSearch$;

  presets: PresetParam[] = [
    { label: 'Any', value: '' },
    { label: 'Albums', value: 'full album' },
    { label: 'Live', value: 'live' }
  ];

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private playerActions: PlayerActions,
    public youtubePlayer: YoutubePlayerService,
    private appLayoutActions: AppLayoutActions,
    private playerSearchActions: PlayerSearchActions
  ) { }

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

  updatePreset(preset: PresetParam) {
    this.youtubeSearch.setPreset(preset.value);
    this.youtubeSearch.search(this.searchQuery, false, this.searchParams);
  }

  get searchParams () {
    return this.getSearchParameter(getQueryParams);
  }

  get searchQuery () {
    return this.getSearchParameter(getQuery);
  }

  private getSearchParameter (selector) {
    let _value;
    this.playerSearch$.take(1)
      .map(selector)
      .subscribe(state => _value = state);
    return _value;
  }
}
