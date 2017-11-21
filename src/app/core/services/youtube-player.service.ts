import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';

@Injectable()
export class YoutubePlayerService {
  public player: YT.Player;

  constructor(private store: Store<EchoesState>,
              private zone: NgZone) {
  }

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
      this.zone.runOutsideAngular(() => this.player.loadVideoById(id, seconds || undefined));
    }
    this.play();
  }

  seekTo(seconds: number) {
    this.zone.runOutsideAngular(() => this.player.seekTo(seconds, true));
  }

  onPlayerStateChange(event) {
    // const state = event.data;
    // this.store.dispatch(new AppPlayer.UpdateState(state));
  }

  setSize(height, width) {
    this.zone.runOutsideAngular(() => {
      this.player.setSize(width, height);
    });
  }
}
