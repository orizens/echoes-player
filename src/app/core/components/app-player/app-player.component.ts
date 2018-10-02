import { NowPlaylistEffects } from '@core/effects/now-playlist.effects';
import * as AppPlayer from '@store/app-player';
import * as NowPlaylist from '@store/now-playlist/now-playlist.selectors';
import { EchoesState } from '@store/reducers';
import { Store } from '@ngrx/store';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  Output
} from '@angular/core';

import { NowPlaylistService } from '@core/services';
import { AppPlayerApi } from '@api/app-player.api';

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
      <youtube-player
        (ready)="setupPlayer($event)"
        (change)="updatePlayerState($event)"
      ></youtube-player>
    </div>
    <div class="container">
      <image-blur [media]="media$ | async" *ngIf="!(isPlayerFullscreen$ | async).on"></image-blur>
      <media-info
        [player]="player$ | async"
        [minimized]="media$ | async"
        (thumbClick)="toggleFullScreen()"
        (seekTrack)="selectTrackInVideo($event)"
      ></media-info>
      <player-controls class="controls-container nicer-ux"
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
export class AppPlayerComponent implements OnInit, OnDestroy {
  player$ = this.store.select(AppPlayer.getPlayer);
  media$ = this.store.select(AppPlayer.getCurrentMedia);
  isPlayerPlaying$ = this.store.select(AppPlayer.getIsPlayerPlaying);
  isPlayerInRepeat$ = this.store.select(NowPlaylist.isPlayerInRepeat);
  isPlayerFullscreen$ = this.store.select(AppPlayer.getPlayerFullscreen);
  isShowPlayer$ = this.store.select(AppPlayer.getShowPlayer);

  @HostBinding('class.youtube-player') style = true;

  constructor(
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects,
    private appPlayerApi: AppPlayerApi
  ) {}

  ngOnInit() {
    this.appPlayerApi.resetPlayer();
    this.nowPlaylistEffects.loadNextTrack$.subscribe(action =>
      this.playVideo(action.payload)
    );
  }

  ngOnDestroy() {}

  setupPlayer(player) {
    this.appPlayerApi.setupPlayer(player);
  }

  updatePlayerState(event) {
    this.appPlayerApi.changePlayerState(event);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo(media);
  }

  pauseVideo() {
    this.appPlayerApi.pauseVideo();
  }

  togglePlayer() {
    this.appPlayerApi.togglePlayer();
  }

  toggleFullScreen() {
    this.appPlayerApi.toggleFullScreen();
  }

  playNextTrack() {
    this.nowPlaylistService.selectNextIndex();
    this.playVideo(this.nowPlaylistService.getCurrent());
  }

  playPreviousTrack() {
    this.nowPlaylistService.selectPreviousIndex();
    this.playVideo(this.nowPlaylistService.getCurrent());
  }

  toggleRepeat() {
    this.appPlayerApi.toggleRepeat();
  }

  selectTrackInVideo(trackEvent: {
    time: string;
    media: GoogleApiYouTubeVideoResource;
  }) {
    this.playVideo(trackEvent.media);
    this.nowPlaylistService.seekToTrack(trackEvent);
  }
}
