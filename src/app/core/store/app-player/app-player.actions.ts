import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ActionTypes {
  static PLAY = '[Player] PLAY';
  static LOAD_AND_PLAY = '[Player] LOAD_AND_PLAY';
  static QUEUE = '[Player] REMOVE';
  static PLAY_STARTED = '[Player] PLAY_STARTED';
  static TOGGLE_PLAYER = '[Player] TOGGLE_PLAYER';
  static STATE_CHANGE = '[Player] STATE_CHANGE';
  static FULLSCREEN = '[Player] FULLSCREEN';
  static RESET = '[Player] RESET';
  static LOAD_NEXT_TRACK = '[Player] LOAD_NEXT_TRACK';
  static RESET_FULLSCREEN = '[Player] RESET_FULLSCREEN';
}
export class PlayVideo implements Action {
  public type = ActionTypes.PLAY;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class TogglePlayer implements Action {
  public type = ActionTypes.TOGGLE_PLAYER;
  constructor(public payload: boolean = true) {}
}

export class LoadNextTrack implements Action {
  public type = ActionTypes.LOAD_NEXT_TRACK;
  public payload = '';
}

export class LoadAndPlay implements Action {
  public type = ActionTypes.LOAD_AND_PLAY;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class PlayStarted implements Action {
  public type = ActionTypes.PLAY_STARTED;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class UpdateState implements Action {
  public type = ActionTypes.STATE_CHANGE;
  constructor(public payload: number) {}
}

export class FullScreen implements Action {
  public type = ActionTypes.FULLSCREEN;
  public payload = '';
}

export class ResetFullScreen implements Action {
  public type = ActionTypes.RESET_FULLSCREEN;
  public payload = '';
}

export class Reset implements Action {
  public type = ActionTypes.RESET;
  public payload = '';
}

export type Actions =
  | PlayVideo
  | TogglePlayer
  | LoadNextTrack
  | LoadAndPlay
  | PlayStarted
  | UpdateState
  | FullScreen
  | Reset
  | any;
