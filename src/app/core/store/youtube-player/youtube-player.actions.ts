import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerActions {
  static PLAY = 'PLAY';
  playVideo(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: PlayerActions.PLAY,
      payload: media
    }
  }
  static LOAD_AND_PLAY = 'LOAD_AND_PLAY';
  loadAndPlay(media: GoogleApiYouTubeSearchResource): Action {
    return {
      type: PlayerActions.LOAD_AND_PLAY,
      payload: media
    }
  }
  static PLAY_STARTED = 'PLAY_STARTED';
  playStarted(media): Action {
    return {
      type: PlayerActions.PLAY_STARTED
    }
  }
  static QUEUE = 'REMOVE';
  static TOGGLE_PLAYER = 'TOGGLE_PLAYER';
  static STATE_CHANGE = 'STATE_CHANGE';
  static FULLSCREEN = 'FULLSCREEN';
}
