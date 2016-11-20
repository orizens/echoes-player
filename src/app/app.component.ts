/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

// SERVICES
import { YoutubeSearch, YoutubePlayerService, NowPlaylistService } from './core/services';

import { EchoesState } from './core/store';
import { YoutubePlayerState, PlayerActions } from './core/store/youtube-player';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { YoutubeMediaPlaylist } from './core/store/now-playlist';
import { AppLayoutActions, AppLayout } from './core/store/app-layout';
// import { Notify } from '@ngrx/notify';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
export class App implements OnInit {
  public player: Observable<YoutubePlayerState>;
  public nowPlaylist$: Observable<YoutubeMediaPlaylist>;
  public appLayout$: Observable<AppLayout>;

  constructor(
    private store: Store<EchoesState>,
    public youtubeSearch: YoutubeSearch,
    public playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions,
    private appLayoutActions: AppLayoutActions
    // private notify: Notify
  ) {
  }

  ngOnInit() {
    this.player = this.playerService.player$;
    this.nowPlaylist$ = this.nowPlaylistService.playlist$;
    this.appLayout$ = this.store.select(_state => _state.appLayout);
  }

  selectVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.playerActions.playVideo(media));
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortVideo (media: GoogleApiYouTubeSearchResource) {

  }

  toggleSidebar () {
    return this.store.dispatch(this.appLayoutActions.toggleSidebar());
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

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
