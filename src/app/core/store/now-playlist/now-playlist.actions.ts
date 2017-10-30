import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class NowPlaylistActions {
  static QUEUE_LOAD_VIDEO = '[NowPlaylist] QUEUE_LOAD_VIDEO';
  static QUEUE = '[NowPlaylist] QUEUE';
  static QUEUE_LOAD_VIDEO_SUCCESS = '[NowPlaylist] QUEUE_LOAD_VIDEO_SUCCESS';
  static SELECT = '[NowPlaylist] SELECT';
  static REMOVE = '[NowPlaylist] REMOVE';
  static UPDATE_INDEX = '[NowPlaylist] UPDATE_INDEX';
  static QUEUE_FAILED = '[NowPlaylist] QUEUE_FAILED';
  static FILTER_CHANGE = '[NowPlaylist] FILTER_CHANGE';
  static REMOVE_ALL = '[NowPlaylist] REMOVE_ALL';
  static SELECT_NEXT = '[NowPlaylist] SELECT_NEXT';
  static SELECT_PREVIOUS = '[NowPlaylist] SELECT_PREVIOUS';
  static QUEUE_VIDEOS = '[NowPlaylist] QUEUE_VIDEOS';
  static MEDIA_ENDED = '[NowPlaylist] MEDIA_ENDED';
  static TOGGLE_REPEAT = '[NowPlaylist] TOGGLE_REPEAT';
  static SELECT_AND_SEEK_TO_TIME = '[NowPlaylist] SELECT_AND_SEEK_TO_TIME';
  static LOAD_PLAYLIST_START = '[NowPlaylist] LOAD_PLAYLIST_START';
  static LOAD_PLAYLIST_END = '[NowPlaylist] LOAD_PLAYLIST_END';
  static PLAY_PLAYLIST = '[NowPlaylist] PLAY_PLAYLIST';
  static PLAY_PLAYLIST_START = '[NowPlaylist] PLAY_PLAYLIST_START';

  toggleRepeat = ActionCreatorFactory.create(NowPlaylistActions.TOGGLE_REPEAT);
  seekTo = ActionCreatorFactory.create<{ time: string; media: GoogleApiYouTubeVideoResource }>(
    NowPlaylistActions.SELECT_AND_SEEK_TO_TIME
  );
}
export class QueueLoadVideo implements Action {
  public type = NowPlaylistActions.QUEUE_LOAD_VIDEO;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class UpdateIndexByMedia implements Action {
  public type = NowPlaylistActions.UPDATE_INDEX;
  constructor(public payload: string) {}
}

export class QueueFailed implements Action {
  public type = NowPlaylistActions.QUEUE_FAILED;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueVideo implements Action {
  public type = NowPlaylistActions.QUEUE;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}
export class QueueVideos implements Action {
  public type = NowPlaylistActions.QUEUE_VIDEOS;
  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}
export class RemoveVideo implements Action {
  public type = NowPlaylistActions.REMOVE;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class FilterChange implements Action {
  public type = NowPlaylistActions.FILTER_CHANGE;
  constructor(public payload: string) {}
}
export class SelectVideo implements Action {
  public type = NowPlaylistActions.SELECT;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class PlayPlaylistAction implements Action {
  readonly type = NowPlaylistActions.PLAY_PLAYLIST;
  constructor(public payload: string) {}
}
export class PlayPlaylistStartAction implements Action {
  readonly type = NowPlaylistActions.PLAY_PLAYLIST_START;
  constructor(public payload: GoogleApiYouTubeVideoResource) {}
}

export class LoadPlaylistAction implements Action {
  readonly type = NowPlaylistActions.LOAD_PLAYLIST_START;
  constructor(public payload: string) {}
}

export class LoadPlaylistEndAction implements Action {
  readonly type = NowPlaylistActions.LOAD_PLAYLIST_END;
  constructor(public payload: GoogleApiYouTubeVideoResource[]) {}
}

export class MediaEnded implements Action {
  public type = NowPlaylistActions.MEDIA_ENDED;
  constructor(public payload?: any) {}
}

export class SelectNext implements Action {
  public type = NowPlaylistActions.SELECT_NEXT;
  constructor(public payload?: any) {}
}
export class SelectPrevious implements Action {
  public type = NowPlaylistActions.SELECT_PREVIOUS;
  constructor(public payload?: any) {}
}
export class RemoveAll implements Action {
  public type = NowPlaylistActions.REMOVE_ALL;
  constructor(public payload?: any) {}
}

export type Actions =
  | PlayPlaylistAction
  | PlayPlaylistStartAction
  | LoadPlaylistAction
  | LoadPlaylistEndAction;
