import { NowPlaylistEffects } from '../../effects/now-playlist.effects';
import { getPlayer$, getCurrentMedia$, getIsPlayerPlaying$ } from '../../store/youtube-player/youtube-player.selectors';
import { isPlayerInRepeat$ } from '../../store/now-playlist/now-playlist.selectors';
import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { NowPlaylistService, YoutubePlayerService } from '../../services';
import { PlayerActions, YoutubePlayerState } from '../../store/youtube-player';

@Component({
  selector: 'ep-player',
  styleUrls: [ './ep-player.scss' ],
  template: `
  <section 
    [class.show-youtube-player]="(player$ | async).showPlayer"
    [class.fullscreen]="(player$ | async).isFullscreen">
    <div class="yt-player ux-maker">
      <player-resizer 
        (toggle)="togglePlayer()"
        [fullScreen]="(player$ | async).showPlayer"
      ></player-resizer>
      <youtube-player class="nicer-ux"
        (ready)="setupPlayer($event)"
        (change)="updatePlayerState($event)"
      ></youtube-player>
    </div>
    <div class="container-fluid">
      <media-info class="col-md-5 col-xs-6"
        [player]="player$ | async"
        [minimized]="media$ | async"
        (thumbClick)="toggleFullScreen()"
      ></media-info>
      <player-controls class="col-md-4 col-xs-6 controls-container nicer-ux" 
        [isRepeat]="isPlayerInRepeat$ | async"
        [playing]="isPlayerPlaying$ | async"
        [media]="media$ | async"
        (pause)="pauseVideo()"
        (next)="playNextTrack()"
        (play)="playVideo($event)"
        (previous)="playPreviousTrack()"
        (repeat)="toggleRepeat()"
      ></player-controls>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  player$ = this.store.let(getPlayer$);
  media$ = this.store.let(getCurrentMedia$);
  isPlayerPlaying$ = this.store.let(getIsPlayerPlaying$);
  isPlayerInRepeat$ = this.store.let(isPlayerInRepeat$);

  @HostBinding('class.youtube-player') style = true;

  constructor(
    private playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions,
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects
  ) {
  }

  ngOnInit() {
    this.store.dispatch(this.playerActions.reset());
    this.nowPlaylistEffects.loadNextTrack$
      .subscribe((action) => this.playVideo(action.payload));
  }

  setupPlayer (player) {
    this.playerService.setupPlayer(player);
  }

  updatePlayerState (event) {
    this.playerService.onPlayerStateChange(event);
    if (event.data === YT.PlayerState.ENDED) {
      // this.store.dispatch(this.playerActions.loadNextTrack());
      this.nowPlaylistService.trackEnded();
    }
  }

  playVideo (media: GoogleApiYouTubeVideoResource) {
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

  playNextTrack () {
    this.nowPlaylistService.selectNextIndex();
    this.store.dispatch(this.playerActions.playVideo(this.nowPlaylistService.getCurrent()));
  }

  playPreviousTrack () {
    this.nowPlaylistService.selectPreviousIndex();
    this.store.dispatch(this.playerActions.playVideo(this.nowPlaylistService.getCurrent()));
  }

  isLastIndex () {
    return this.nowPlaylistService.isInLastTrack();
  }

  toggleRepeat() {
    this.nowPlaylistService.toggleRepeat();
  }
}
