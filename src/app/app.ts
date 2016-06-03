/*
 * Angular 2 decorators and services
 */
import {Component} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FORM_PROVIDERS} from '@angular/common';

// import {Home} from './home/home';
// import { InfiniteScroll } from 'angular2-infinite-scroll';
import { InfiniteScroll } from './core/directives/infinite-scroll/infinite-scroll';
import { YoutubeVideos } from './youtube-videos/youtube-videos';
import { UserArea } from './user-area/user-area';
import { YoutubeSearch } from './core/services/youtube.search';
import { UserManager } from './core/services/user-manager.service';
import { YoutubePlayer } from './youtube-player/youtube-player';
import { YoutubePlayerService } from './core/services/youtube-player.service';
import { NowPlaylist } from './now-playlist/now-playlist';
import { NowPlaylistFilter } from './now-playlist-filter/now-playlist-filter';
import { NowPlaylistService } from './core/services/now-playlist.service';
import { YoutubePlayerState } from './core/store/youtube-player.ts';
import { YoutubeVideosInfo } from './core/services/youtube-videos-info.service';
import { Observable } from "rxjs/Observable";
import { YoutubeMediaPlaylist } from './core/store/now-playlist';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS, YoutubeSearch,
    YoutubePlayerService, NowPlaylistService, UserManager,
    NowPlaylistService,
    YoutubeVideosInfo
  ],
  directives: [...ROUTER_DIRECTIVES,
    InfiniteScroll,
    YoutubePlayer,
    NowPlaylist,
    NowPlaylistFilter
  ],
  pipes: [],
  styles: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: YoutubeVideos, name: 'Index' },
  { path: '/user', component: UserArea, name: 'UserArea' },
  // { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  public start = true;
  public player: Observable<any>;
  public nowPlaylist: Observable<YoutubeMediaPlaylist>;

  constructor(public youtubeSearch: YoutubeSearch,
    public playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService
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

  selectVideo (media: GoogleApiYouTubeSearchResource) {
    this.playerService.playVideo(media);
    this.nowPlaylistService.updateIndexByMedia(media);
  }

  handleVideoEnded (state) {
    if (!this.isLastIndex()) {
      this.playNextVideo(state);
    }
  }

  playNextVideo (player) {
    this.nowPlaylistService.selectNextIndex();
    this.selectVideo(this.nowPlaylistService.getCurrent());
  }

  sortVideo (media: GoogleApiYouTubeSearchResource) {

  }

  isLastIndex () {
    // return this.nowPlaylist.index + 1 === this.nowPlaylist.length;
  }
}
