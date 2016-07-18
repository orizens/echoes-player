/*
 * Angular 2 decorators and services
 */
import {Component} from '@angular/core';
// import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FORM_PROVIDERS} from '@angular/common';

import { InfiniteScroll } from 'angular2-infinite-scroll';
// DIRECTIVES/COMPONENTS
// import { InfiniteScroll } from './core/directives/infinite-scroll/infinite-scroll';
import { YoutubePlayer } from './youtube-player/youtube-player';
import { NowPlaylist } from './now-playlist';
import { NowPlaylistFilter } from './now-playlist-filter';

// SERVICES
import { YoutubeSearch } from './core/services/youtube.search';
import { YoutubePlayerService } from './core/services/youtube-player.service';
import { NowPlaylistService } from './core/services/now-playlist.service';

import { EchoesState } from './core/store';
import { YoutubePlayerState, PlayerActions } from './core/store/youtube-player.ts';
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import { YoutubeMediaPlaylist } from './core/store/now-playlist';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [
    InfiniteScroll,
    YoutubePlayer,
    NowPlaylist,
    NowPlaylistFilter
  ],
  pipes: [],
  styles: [],
  template: require('./app.html')
})
export class App {
  public start = true;
  public player: Observable<YoutubePlayerState>;
  public nowPlaylist: Observable<YoutubeMediaPlaylist>;

  constructor(
    private store: Store<EchoesState>,
    public youtubeSearch: YoutubeSearch,
    public playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions
  ) {
    this.player = this.playerService.player$;
    this.nowPlaylist = nowPlaylistService.playlist$;
  }

  onScroll () {
    if (this.start) {
      this.start = false;
      return;
    }
    this.youtubeSearch.searchMore();
  }

  selectVideo (media: GoogleApiYouTubeVideoResource) {
    // this.playerService.playVideo(media);
    this.store.dispatch(this.playerActions.playVideo(media));
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  handleVideoEnded (state) {
    if (!this.isLastIndex()) {
      this.playNextVideo(state);
    }
  }

  playNextVideo (player) {
    this.nowPlaylistService.selectNextIndex();
    this.playerService.playVideo(this.nowPlaylistService.getCurrent());
  }

  sortVideo (media: GoogleApiYouTubeSearchResource) {

  }

  isLastIndex() {
    
  }
}


// const futureApp = {
// template: `
// <section class="sidebar">
//   <app-nav></app-nav>
//   <div class="sidebar-pane">
//     <now-playlist
//       [playlist]="nowPlaylist"
//       (select)="selectVideo($event)"
//       (sort)="sortVideo($event)"
//     ></now-playlist>
//   </div>
// </section>
// <app-loader></app-loader>
// <content-viewer></content-viewer>
// <youtube-player
//   id="youtube-player-container"
//   [player]="player"
//   (ended)="handleVideoEnded($event)"
//   (playNext)="playNextVideo($event)"
//   player-id="player"
//   auto-next
// ></youtube-player>`
// }
