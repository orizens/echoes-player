import { EchoesState } from '../core/store';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { NowPlaylistService, YoutubePlayerService } from '../core/services';
import { getCurrentMedia, isPlayerPlaying, PlayerActions, YoutubePlayerState } from '../core/store/youtube-player';

import './youtube-player.less';

@Component({
  selector: 'player',
  host: {
    class: 'youtube-player',
    '[class.show-youtube-player]': '(player$ | async).showPlayer',
    '[class.fullscreen]': '(player$ | async).isFullscreen'
  },
  template: require('./youtube-player.html'),
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
    this.store.dispatch(this.playerActions.resetFullScreen());
  }

  setupPlayer (player) {
    this.playerService.setupPlayer(player);
  }

  updatePlayerState (event) {
    this.playerService.onPlayerStateChange(event);
    if (event.data === YT.PlayerState.ENDED) {
      this.handleVideoEnded(event.data);
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

  handleVideoEnded (state: YT.PlayerState) {
    if (!this.isLastIndex()) {
      this.playPreviousTrack(state);
    }
  }

  isLastIndex () {
    return this.nowPlaylistService.isInLastTrack();
  }
}
