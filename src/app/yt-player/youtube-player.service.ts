import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { uid } from 'uid';

@Injectable()
export class YoutubePlayerService {
  player: YT.Player;
  api: ReplaySubject<any>;

  private isFullscreen: boolean = false;
  private defaultSizes = {
      height: 270,
      width: 367
  };

  constructor (private zone: NgZone) {
    this.api = new ReplaySubject(1);
    
  }

  loadPlayerApi () {
    const doc = window.document;
    let playerApiScript = doc.createElement("script");
    playerApiScript.type = "text/javascript";
    playerApiScript.src = "http://www.youtube.com/iframe_api";
    doc.appendChild(playerApiScript);
  }

  setupPlayer (elementId: string) {
    const createPlayer = () => {
      if (window.YT.Player) {
        this.player = this.createPlayer(elementId, () => {});
      }
    };
    window['onYouTubeIframeAPIReady'] = createPlayer;
    if (window.YT) {
      createPlayer();
    }
  }

  play () {
    this.player.playVideo();
  }

  pause () {
    this.player.pauseVideo();
  }

  playVideo(media: any) {
    const id = media.id.videoId ? media.id.videoId : media.id;
    this.player.loadVideoById(id);
    this.play();
    // this.store.dispatch({ type: PLAY, payload: media });
  }

  isPlaying () {
    // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
    const isPlayerReady: any = this.player && this.player.getPlayerState;
    const playerState = isPlayerReady ? this.player.getPlayerState() : {};
    const isPlayerPlaying = isPlayerReady
      ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
      : false;
    return isPlayerPlaying;
  }

  // createPlayer (elementId, height, width, videoId, callback) {
  createPlayer (elementId: string, callback) {
    const service = this;
    const defaultSizes = this.defaultSizes;
    return new window.YT.Player(elementId, {
        height: defaultSizes.height,
        width: defaultSizes.width,
        videoId: '',
        // playerVars: playerVars,
        events: {
            onReady: () => {},
            onStateChange: (ev) => this.zone.run(() => onPlayerStateChange(ev))
        }
    });

    function onPlayerStateChange (event) {
      const state = event.data;
      // play the next song if its not the end of the playlist
      // should add a "repeat" feature
      if (state === YT.PlayerState.ENDED) {
        // service.listeners.ended.forEach(callback => callback(state));
      }

      if (state === YT.PlayerState.PAUSED) {
          // service.playerState = YT.PlayerState.PAUSED;
      }
      if (state === YT.PlayerState.PLAYING) {
          // service.playerState = YT.PlayerState.PLAYING;
      }
      console.log('state changed', state);
      // dispatch STATE CHANGE
    }
  }

  setSize () {
    let height: number;
    let width: number;

    if (!this.isFullscreen) {
      height = window.innerHeight;
          width = window.innerWidth;
    } else {
      height = this.defaultSizes.height;
      width = this.defaultSizes.width;
    }
    this.player.setSize(width, height);
    // TODO: trigger event
  }
}
