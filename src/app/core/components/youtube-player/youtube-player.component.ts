import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { NowPlaylistService, YoutubePlayerService } from '../../services';
import { getCurrentMedia, isPlayerPlaying, PlayerActions, YoutubePlayerState } from '../../store/youtube-player';

import './youtube-player.scss';

@Component({
  selector: 'player',
  host: {
    class: 'youtube-player'
    // '[class.show-youtube-player]': '(player$ | async).showPlayer',
    // '[class.fullscreen]': '(player$ | async).isFullscreen'
  },
  template: `
  <section 
    [class.show-youtube-player]="(player$ | async).showPlayer"
    [class.fullscreen]="(player$ | async).isFullscreen">
    <div class="yt-player ux-maker">
      <player-resizer (toggle)="togglePlayer()" [fullScreen]="(player$ | async).showPlayer"></player-resizer>
      <youtube-player class="nicer-ux"
        (ready)="setupPlayer($event)"
        (change)="updatePlayerState($event)"
      ></youtube-player>
    </div>
    <div class="container-fluid">
      <media-info class="col-md-5 col-xs-7"
          [player]="player$ | async"
          [minimized]="media$ | async"
          (thumbClick)="toggleFullScreen()"
      ></media-info>
      <player-controls class="col-md-4 col-xs-5 controls-container nicer-ux" 
        [class.yt-playing]="isPlayerPlaying$ | async"
        [media]="media$ | async"
        (play)="playVideo($event)" 
        (pause)="pauseVideo()" 
        (next)="playNextTrack()"
        (previous)="playPreviousTrack()"
      ></player-controls>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayer implements OnInit {
  player$: Observable<YoutubePlayerState>;
  media$: Observable<any>;
  isPlayerPlaying$: Observable<boolean>;

  constructor(
    private playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions,
    private store: Store<EchoesState>,
  ) {
  }

  ngOnInit() {
    this.player$ = this.playerService.player$;
    this.media$ = getCurrentMedia(this.player$);
    this.isPlayerPlaying$ = isPlayerPlaying(this.player$);
    this.store.dispatch(this.playerActions.reset());
  }

  setupPlayer (player) {
    this.playerService.setupPlayer(player);
  }

  updatePlayerState (event) {
    this.playerService.onPlayerStateChange(event);
    if (event.data === YT.PlayerState.ENDED) {
      this.nowPlaylistService.trackEnded();
      this.store.dispatch(this.playerActions.playVideo(this.nowPlaylistService.getCurrent()));
    }
  }

  playVideo (media: any) {
    this.store.dispatch(this.playerActions.playVideo(media));
  }

  pauseVideo () {
    this.playerService.pause();
  }

  togglePlayer () {
    this.playerService.togglePlayer();
  }

  toggleFullScreen () {
    this.playerService.setSize();
  }

  playNextTrack (player) {
    this.nowPlaylistService.selectNextIndex();
    this.store.dispatch(this.playerActions.playVideo(this.nowPlaylistService.getCurrent()));
  }

  playPreviousTrack (player) {
    this.nowPlaylistService.selectPreviousIndex();
    this.store.dispatch(this.playerActions.playVideo(this.nowPlaylistService.getCurrent()));
  }

  isLastIndex () {
    return this.nowPlaylistService.isInLastTrack();
  }
}
