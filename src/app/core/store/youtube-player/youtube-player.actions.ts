import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerActions {
  static PLAY = '[Player] PLAY';
  static LOAD_AND_PLAY = '[Player] LOAD_AND_PLAY';
  static QUEUE = '[Player] REMOVE';
  static PLAY_STARTED = '[Player] PLAY_STARTED';
  static TOGGLE_PLAYER = '[Player] TOGGLE_PLAYER';
  static STATE_CHANGE = '[Player] STATE_CHANGE';
  static FULLSCREEN = '[Player] FULLSCREEN';

  playVideo(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: PlayerActions.PLAY,
      payload: media
    };
  }

  loadAndPlay(media: GoogleApiYouTubeSearchResource): Action {
    return {
      type: PlayerActions.LOAD_AND_PLAY,
      payload: media
    };
  }

  playStarted(media): Action {
    return {
      type: PlayerActions.PLAY_STARTED
    };
  }

  updateState(state: number): Action {
    return {
      type: PlayerActions.STATE_CHANGE,
      payload: state
    };
  }

  togglePlayer(visible: boolean = true): Action {
    return {
      type: PlayerActions.TOGGLE_PLAYER,
      payload: visible
    };
  }

  fullScreen(): Action {
    return {
      type: PlayerActions.FULLSCREEN
    };
  }
}
