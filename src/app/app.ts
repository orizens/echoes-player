/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';

// import {Home} from './home/home';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import { YoutubeVideos } from './youtube-videos/youtube-videos';
import { YoutubeSearch } from './core/services/youtube.search';
import { YoutubePlayer } from './youtube-player/youtube-player';
import { YoutubePlayerService } from './core/services/youtube-player.service';
import { NowPlaylist } from './now-playlist/now-playlist';
import { NowPlaylistFilter } from './now-playlist-filter/now-playlist-filter';
import { NowPlaylistService } from './core/services/now-playlist.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS, YoutubeSearch, YoutubePlayerService, NowPlaylistService],
  directives: [...ROUTER_DIRECTIVES, RouterActive, InfiniteScroll,
    YoutubePlayer,
    NowPlaylist,
    NowPlaylistFilter
  ],
  pipes: [],
  styles: [],
  template: require('./app.html')
  //         <li router-active="active">
  //           <a [routerLink]=" ['Index'] ">Index</a>
  //         </li>
  //         <li router-active="active">
  //           <a [routerLink]=" ['Home'] ">Home</a>
  //         </li>
  //       </ul>
  //     </nav>
  //   </header>

})
@RouteConfig([
  { path: '/', component: YoutubeVideos, name: 'Index' },
  // { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  public start = true;
  public player: any;
  public nowPlaylist: any = {};

  constructor(public youtubeSearch: YoutubeSearch,
    public playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService
  ) {
    this.playerService.player$.subscribe(player => this.player = player);
    nowPlaylistService.playlist$.subscribe(playlist => this.nowPlaylist = playlist);
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
  }

  sortVideo (media: GoogleApiYouTubeSearchResource) {

  }
}
