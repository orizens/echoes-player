import { NowPlaylistEffects } from '../../effects/now-playlist.effects';
import * as AppPlayer from '../../store/app-player';
import { isPlayerInRepeat$ } from '../../store/now-playlist/now-playlist.selectors';
import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { NowPlaylistService, YoutubePlayerService } from '../../services';

@Component({
  selector: 'app-player',
  styleUrls: ['./app-player.scss'],
  template: `
  <section
    [class.show-youtube-player]="isShowPlayer$ | async"
    [class.fullscreen]="(isPlayerFullscreen$ | async).on">
    <div class="yt-player ux-maker">
      <player-resizer
        (toggle)="togglePlayer()"
        [fullScreen]="isShowPlayer$ | async"
      ></player-resizer>
      <youtube-player class="nicer-ux"
        (ready)="setupPlayer($event)"
        (change)="updatePlayerState($event)"
      ></youtube-player>
    </div>
    <div class="container-fluid">
      <image-blur [media]="media$ | async"></image-blur>
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
export class AppPlayerComponent implements OnInit {
  player$ = this.store.let(AppPlayer.getPlayer$);
  media$ = this.store.let(AppPlayer.getCurrentMedia$);
  isPlayerPlaying$ = this.store.let(AppPlayer.getIsPlayerPlaying$);
  isPlayerInRepeat$ = this.store.let(isPlayerInRepeat$);
  isPlayerFullscreen$ = this.store.let(AppPlayer.getPlayerFullscreen$);
  isShowPlayer$ = this.store.let(AppPlayer.getShowPlayer$);

  @HostBinding('class.youtube-player') style = true;

  constructor(
    private playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects
  ) {}

  ngOnInit() {
    this.store.dispatch(new AppPlayer.Reset());
    this.nowPlaylistEffects.loadNextTrack$.subscribe(action => this.playVideo(action.payload));
  }

  setupPlayer(player) {
    this.playerService.setupPlayer(player);
  }

  updatePlayerState(event) {
    this.playerService.onPlayerStateChange(event);
    if (event.data === YT.PlayerState.ENDED) {
      // this.store.dispatch(this.playerActions.loadNextTrack());
      this.nowPlaylistService.trackEnded();
    }
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new AppPlayer.PlayVideo(media));
  }

  pauseVideo() {
    this.playerService.pause();
  }

  togglePlayer() {
    this.playerService.togglePlayer();
  }

  toggleFullScreen() {
    this.store.dispatch(new AppPlayer.FullScreen());
  }

  playNextTrack() {
    this.nowPlaylistService.selectNextIndex();
    this.store.dispatch(new AppPlayer.PlayVideo(this.nowPlaylistService.getCurrent()));
  }

  playPreviousTrack() {
    this.nowPlaylistService.selectPreviousIndex();
    this.store.dispatch(new AppPlayer.PlayVideo(this.nowPlaylistService.getCurrent()));
  }

  isLastIndex() {
    return this.nowPlaylistService.isInLastTrack();
  }

  toggleRepeat() {
    this.nowPlaylistService.toggleRepeat();
  }
}
