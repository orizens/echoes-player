import {
  Component, EventEmitter, Input,
  Output, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  YoutubePlayerService,
  NowPlaylistService,
  UserProfile,
  Authorization
} from '../core/services';
import { EchoesState } from '../core/store';
import { NowPlaylistActions } from '../core/store/now-playlist';
import { PlayerActions } from '../core/store/youtube-player';

import './user-area.scss';

@Component({
  selector: 'user-area',
  template: `
  <article>
    <app-navbar>
      <h3 class="navbar-text">
        <i class="fa fa-heart"></i> My Profile - <small>My Playlists</small>
      </h3>
    </app-navbar>
    <p *ngIf="!isSignIn()" class="well lead">
      To view your playlists in youtube, you need to sign in.
      <button class="btn btn-lg btn-primary"
        (click)="signInUser()">
        <i class="fa fa-google"></i> Sign In
      </button>
    </p>
    <section class="videos-list">
      <div class="list-unstyled ux-maker youtube-items-container clearfix">
        <youtube-playlist
          *ngFor="let playlist of playlists$ | async"
          [media]="playlist"
          (play)="playSelectedPlaylist(playlist)"
          (queue)="queueSelectedPlaylist(playlist)">
        </youtube-playlist>
      </div>
    </section>
  </article>
  `
})
export class UserArea implements OnInit {
  playlists$: Observable<GoogleApiYouTubePlaylistResource[]>;

  constructor(
    public youtubePlayer: YoutubePlayerService,
    private nowPlaylistService: NowPlaylistService,
    private userProfile: UserProfile,
    private authorization: Authorization,
    private playerActions: PlayerActions,
    private nowPlaylistActions: NowPlaylistActions,
    public store: Store<EchoesState>
  ) {}

  ngOnInit () {
    this.playlists$ = this.store.select(state => state.user.playlists);
  }

  signInUser () {
    this.authorization.signIn();
  }

  isSignIn () {
    return this.authorization.isSignIn();
  }

  getPlaylists () {
    return this.userProfile.getPlaylists(true);
  }

  playSelectedPlaylist (media: GoogleApiYouTubePlaylistResource) {
    const that = this;
    this.userProfile.fetchPlaylistItems(media.id)
      .then(response => {
        response.take(1).subscribe(items => {
          that.store.dispatch(that.nowPlaylistActions.queueVideos(items));
          this.nowPlaylistService.updateIndexByMedia(items[0].id);
          that.store.dispatch(that.playerActions.loadAndPlay(items[0]));
        });
        // this.nowPlaylistService.queueVideos(response.items);
        // this.youtubePlayer.playVideo(response.items[0]);
      });
  }

  queueSelectedPlaylist (media: GoogleApiYouTubePlaylistResource) {
    // this.nowPlaylistService.queueVideo(media);
  }
}
