import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { AppPlayerActions } from '../store/app-player';

@Injectable()
export class YoutubePlayerService {
  public player: YT.Player;

  constructor (
    private store: Store<EchoesState>,
    private zone: NgZone,
    private playerActions: AppPlayerActions
    ) { }

  setupPlayer (player) {
    this.player = player;
  }

  play () {
    this.zone.runOutsideAngular(() => this.player.playVideo());
  }

  pause () {
    this.zone.runOutsideAngular(() => this.player.pauseVideo());
  }

  playVideo(media: GoogleApiYouTubeVideoResource, seconds?: number) {
    const id = media.id;
    const loadedMedia = this.player.getVideoData();
    const loadedMediaId = loadedMedia.video_id;
    const isLoaded = '' !== loadedMediaId && id === loadedMediaId;
    if (!isLoaded) {
      this.zone.runOutsideAngular(() => this.player.loadVideoById(id, seconds || undefined));
    }
    this.play();
  }

  seekTo(seconds: number) {
    this.zone.runOutsideAngular(() => this.player.seekTo(seconds, true));
  }

  togglePlayer() {
    this.store.dispatch(this.playerActions.togglePlayer(true));
  }

  onPlayerStateChange (event) {
    const state = event.data;
    // let autoNext = false;
    // play the next song if its not the end of the playlist
    // should add a "repeat" feature
    if (state === YT.PlayerState.ENDED) {
      // this.listeners.ended.forEach(callback => callback(state));
    }

    if (state === YT.PlayerState.PAUSED) {
      // service.playerState = YT.PlayerState.PAUSED;
    }
    if (state === YT.PlayerState.PLAYING) {
      // service.playerState = YT.PlayerState.PLAYING;
    }
    this.store.dispatch(this.playerActions.updateState(state));
  }

  setSize (height, width) {
    this.zone.runOutsideAngular(() => {
      this.player.setSize(width, height);
    });
  }
}
