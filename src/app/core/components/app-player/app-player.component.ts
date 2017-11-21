import { NowPlaylistEffects } from '../../effects/now-playlist.effects';
import { isPlayerInRepeat$ } from '../../store/now-playlist/now-playlist.selectors';
import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

import { NowPlaylistService, YoutubePlayerService } from '../../services';
import { AppPlayerService } from '../../services/app-player.service';

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
  // player$ = this.store.let(AppPlayer.getPlayer$);
  // media$ = this.store.let(AppPlayer.getCurrentMedia$);
  // isPlayerPlaying$ = this.store.let(AppPlayer.getIsPlayerPlaying$);
  // isPlayerFullscreen$ = this.store.let(AppPlayer.getPlayerFullscreen$);
  // isShowPlayer$ = this.store.let(AppPlayer.getShowPlayer$);
  // isPlayerInRepeat$ = this.store.let(isPlayerInRepeat$);

  media$ = this.appPlayerService.appPlayer.map(p => p.media);
  player$ = this.appPlayerService.appPlayer;
  isPlayerPlaying$ = this.appPlayerService.appPlayer.map(p => p.playerState)
    .map((playerState: YT.PlayerState) => playerState === 1);

  isPlayerInRepeat$ = this.nowPlaylistService.playlist$.map(playlist => playlist.repeat);
  isPlayerFullscreen$ = this.appPlayerService.appPlayer.map(p => p.fullscreen);
  isShowPlayer$ = this.appPlayerService.appPlayer.map(p => p.showPlayer);

  @HostBinding('class.youtube-player') style = true;

  constructor(
    private playerService: YoutubePlayerService,
    public nowPlaylistService: NowPlaylistService,
    private appPlayerService: AppPlayerService,
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects
  ) {}

  ngOnInit() {
    // this.store.dispatch(new AppPlayer.Reset());
    this.appPlayerService.reset();
    // this.nowPlaylistEffects.loadNextTrack$.subscribe(action => this.playVideo(action.payload));
  }

  setupPlayer(player) {
    this.playerService.setupPlayer(player);
  }

  updatePlayerState(event) {
    this.playerService.onPlayerStateChange(event);

    // moved from youtube player service
    this.appPlayerService.updateState(event.data);

    if (event.data === YT.PlayerState.ENDED) {
      // this.store.dispatch(this.playerActions.loadNextTrack());
      this.nowPlaylistService.trackEnded();
      this.nowPlaylistService.playlist$.map(nowPlaylist => {
        const selectedId = nowPlaylist.selectedId;
        const mediaIds = nowPlaylist.videos.map(video => video.id);
        const selectedMediaIndex = mediaIds.indexOf(selectedId);
        return nowPlaylist.videos[selectedMediaIndex];
      }).filter((video: GoogleApiYouTubeVideoResource) => video && video.hasOwnProperty('id'))
        .subscribe(video => {
        this.playVideo(video);
      });

    }
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new AppPlayer.PlayVideo(media));
    this.appPlayerService.play(media);
  }

  pauseVideo() {
    this.playerService.pause();
  }

  togglePlayer() {
    // this.playerService.togglePlayer();
    this.appPlayerService.togglePlayer();
  }

  toggleFullScreen() {
    // this.store.dispatch(new AppPlayer.FullScreen());
    this.appPlayerService.fullScreen();
  }

  playNextTrack() {
    this.nowPlaylistService.selectNextIndex();
    this.appPlayerService.play(this.nowPlaylistService.getCurrent());
    // this.store.dispatch(new AppPlayer.PlayVideo(this.nowPlaylistService.getCurrent()));
  }

  playPreviousTrack() {
    this.nowPlaylistService.selectPreviousIndex();
    this.appPlayerService.play(this.nowPlaylistService.getCurrent());
    // this.store.dispatch(new AppPlayer.PlayVideo(this.nowPlaylistService.getCurrent()));
  }

  isLastIndex() {
    return this.nowPlaylistService.isInLastTrack();
  }

  toggleRepeat() {
    this.nowPlaylistService.toggleRepeat();
  }
}
