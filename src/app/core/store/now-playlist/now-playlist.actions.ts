import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

export enum ActionTypes {
  QUEUE_LOAD_VIDEO = '[NowPlaylist] QUEUE_LOAD_VIDEO',
  QUEUE = '[NowPlaylist] QUEUE',
  QUEUE_LOAD_VIDEO_SUCCESS = '[NowPlaylist] QUEUE_LOAD_VIDEO_SUCCESS',
  SELECT = '[NowPlaylist] SELECT',
  REMOVE = '[NowPlaylist] REMOVE',
  UPDATE_INDEX = '[NowPlaylist] UPDATE_INDEX',
  QUEUE_FAILED = '[NowPlaylist] QUEUE_FAILED',
  FILTER_CHANGE = '[NowPlaylist] FILTER_CHANGE',
  REMOVE_ALL = '[NowPlaylist] REMOVE_ALL',
  SELECT_NEXT = '[NowPlaylist] SELECT_NEXT',
  SELECT_PREVIOUS = '[NowPlaylist] SELECT_PREVIOUS',
  QUEUE_VIDEOS = '[NowPlaylist] QUEUE_VIDEOS',
  MEDIA_ENDED = '[NowPlaylist] MEDIA_ENDED',
  TOGGLE_REPEAT = '[NowPlaylist] TOGGLE_REPEAT',
  SELECT_AND_SEEK_TO_TIME = '[NowPlaylist] SELECT_AND_SEEK_TO_TIME',
  LOAD_PLAYLIST_START = '[NowPlaylist] LOAD_PLAYLIST_START',
  LOAD_PLAYLIST_END = '[NowPlaylist] LOAD_PLAYLIST_END',
  PLAY_PLAYLIST = '[NowPlaylist] PLAY_PLAYLIST',
  PLAY_PLAYLIST_START = '[NowPlaylist] PLAY_PLAYLIST_START',
  PLAYER_STATE_CHANGE = '[NowPlaylist] PLAYER_STATE_CHANGE'
}

export class SeekTo implements Action {
  public type = ActionTypes.SELECT_AND_SEEK_TO_TIME;
  constructor(
    public payload: { time: string; media: GoogleApiYouTubeVideoResource }
  ) {}
}
export class QueueLoadVideo implements Action {
  public type = ActionTypes.QUEUE_LOAD_VIDEO;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class UpdateIndexByMedia implements Action {
  public type = ActionTypes.UPDATE_INDEX;
  constructor(public payload: string) {}
}

export class QueueFailed implements Action {
  public type = ActionTypes.QUEUE_FAILED;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueVideo implements Action {
  public type = ActionTypes.QUEUE;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueVideos implements Action {
  public type = ActionTypes.QUEUE_VIDEOS;
  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}
export class RemoveVideo implements Action {
  public type = ActionTypes.REMOVE;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class FilterChange implements Action {
  public type = ActionTypes.FILTER_CHANGE;
  constructor(public payload: string) {}
}
export class SelectVideo implements Action {
  public type = ActionTypes.SELECT;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class PlayPlaylistAction implements Action {
  readonly type = ActionTypes.PLAY_PLAYLIST;
  constructor(public payload: string) {}
}
export class PlayPlaylistStartAction implements Action {
  readonly type = ActionTypes.PLAY_PLAYLIST_START;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class LoadPlaylistAction implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_START;
  constructor(public payload: string) {}
}

export class LoadPlaylistEndAction implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_END;
  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export class MediaEnded implements Action {
  public type = ActionTypes.MEDIA_ENDED;
  constructor(public payload?: any) {}
}

export class SelectNext implements Action {
  public type = ActionTypes.SELECT_NEXT;
  constructor(public payload?: any) {}
}
export class SelectPrevious implements Action {
  public type = ActionTypes.SELECT_PREVIOUS;
  constructor(public payload?: any) {}
}
export class RemoveAll implements Action {
  public type = ActionTypes.REMOVE_ALL;
  constructor(public payload?: any) {}
}
export class ToggleRepeat implements Action {
  public type = ActionTypes.TOGGLE_REPEAT;
  constructor(public payload = '') {}
}
export class PlayerStateChange implements Action {
  public type = ActionTypes.PLAYER_STATE_CHANGE;
  constructor(public payload: YT.PlayerState) {}
}

export type Actions =
  | PlayPlaylistAction
  | PlayPlaylistStartAction
  | LoadPlaylistAction
  | LoadPlaylistEndAction
  | MediaEnded
  | SelectNext
  | SelectPrevious
  | RemoveAll
  | ToggleRepeat
  | PlayerStateChange;
