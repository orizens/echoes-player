import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';

@Injectable()
export class YoutubePlayerService {
  public player: YT.Player;

  constructor(private store: Store<EchoesState>, private zone: NgZone) {}

  setupPlayer(player) {
    this.player = player;
  }

  play() {
    this.zone.runOutsideAngular(() => this.player.playVideo());
  }

  pause() {
    this.zone.runOutsideAngular(() => this.player.pauseVideo());
  }

  playVideo(media: GoogleApiYouTubeVideoResource, seconds?: number) {
    const id = media.id;
    const isLoaded = this.player.getVideoUrl().includes(id);
    if (!isLoaded) {
      this.zone.runOutsideAngular(() =>
        this.player.loadVideoById(id, seconds || undefined)
      );
    }
    this.play();
  }

  seekTo(seconds: number) {
    this.zone.runOutsideAngular(() => this.player.seekTo(seconds, true));
  }

  // Not in use
  onPlayerStateChange(event) {
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
  }

  setSize(height, width) {
    this.zone.runOutsideAngular(() => {
      this.player.setSize(width, height);
    });
  }
}
