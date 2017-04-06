import { getPlayer$, getCurrentMedia$, getIsPlayerPlaying$ } from '../../store/youtube-player/youtube-player.selectors';
import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { NowPlaylistService, YoutubePlayerService } from '../../services';
import { PlayerActions, YoutubePlayerState } from '../../store/youtube-player';

@Component({
  selector: 'player',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './youtube-player.scss' ],
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
        (pause)="pauseVideo()"
        (next)="playNextTrack()"
        (play)="playVideo($event)"
        (previous)="playPreviousTrack()"
      ></player-controls>
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayerComponent implements OnInit {
  player$ = this.store.let(getPlayer$);
  media$ = this.store.let(getCurrentMedia$);
  isPlayerPlaying$ = this.store.let(getIsPlayerPlaying$);

  @HostBinding('class.youtube-player') style = true;

  constructor(
    private playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions,
    private store: Store<EchoesState>,
  ) {
  }

  ngOnInit() {
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
}
