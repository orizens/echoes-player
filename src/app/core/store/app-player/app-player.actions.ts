import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from '../action-creator.util';

@Injectable()
export class AppPlayerActions {
  static PLAY = '[Player] PLAY';
  static LOAD_AND_PLAY = '[Player] LOAD_AND_PLAY';
  static QUEUE = '[Player] REMOVE';
  static PLAY_STARTED = '[Player] PLAY_STARTED';
  static TOGGLE_PLAYER = '[Player] TOGGLE_PLAYER';
  static STATE_CHANGE = '[Player] STATE_CHANGE';
  static FULLSCREEN = '[Player] FULLSCREEN';
  static RESET = '[Player] RESET';
  static LOAD_NEXT_TRACK = '[PLAYER] LOAD_NEXT_TRACK';

  togglePlayer = ActionCreatorFactory.create<boolean>(AppPlayerActions.TOGGLE_PLAYER, true);
  playVideo = ActionCreatorFactory.create<GoogleApiYouTubeVideoResource>(AppPlayerActions.PLAY);
  loadNextTrack = ActionCreatorFactory.create(AppPlayerActions.LOAD_NEXT_TRACK);

  loadAndPlay(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: AppPlayerActions.LOAD_AND_PLAY,
      payload: media
    };
  }

  playStarted(media): Action {
    return {
      type: AppPlayerActions.PLAY_STARTED
    };
  }

  updateState(state: number): Action {
    return {
      type: AppPlayerActions.STATE_CHANGE,
      payload: state
    };
  }

  // togglePlayer(visible: boolean = true): Action {
  //   return {
  //     type: AppPlayerActions.TOGGLE_PLAYER,
  //     payload: visible
  //   };
  // }

  fullScreen(): Action {
    return {
      type: AppPlayerActions.FULLSCREEN
    };
  }

  reset(): Action {
    return {
      type: AppPlayerActions.RESET
    };
  }
}
