import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
// import { ActionCreatorFactory } from '../action-creator.util';
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

  mediaEnded = ActionCreatorFactory.create(NowPlaylistActions.MEDIA_ENDED);
  selectNext = ActionCreatorFactory.create(NowPlaylistActions.SELECT_NEXT);
  selectPrevious = ActionCreatorFactory.create(NowPlaylistActions.SELECT_PREVIOUS);
  removeAll = ActionCreatorFactory.create(NowPlaylistActions.REMOVE_ALL);
  removeVideo = ActionCreatorFactory.create<GoogleApiYouTubeVideoResource>(NowPlaylistActions.REMOVE);
  toggleRepeat = ActionCreatorFactory.create(NowPlaylistActions.TOGGLE_REPEAT);
  seekTo = ActionCreatorFactory.create<{time: string, media: GoogleApiYouTubeVideoResource}>(NowPlaylistActions.SELECT_AND_SEEK_TO_TIME);

  queueLoadVideo(media): Action {
    return {
      type: NowPlaylistActions.QUEUE_LOAD_VIDEO,
      payload: media
    };
  }

  queueVideo(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: NowPlaylistActions.QUEUE,
      payload: media
    };
  }

  updateIndexByMedia(mediaId: string): Action {
    return {
      type: NowPlaylistActions.UPDATE_INDEX,
      payload: mediaId
    };
  }

  queueFailed(media): Action {
    return {
      type: NowPlaylistActions.QUEUE_FAILED,
      payload: media
    };
  }

  queueVideos(videos: any): Action {
    return {
      type: NowPlaylistActions.QUEUE_VIDEOS,
      payload: videos
    };
  }

  selectVideo(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: NowPlaylistActions.SELECT,
      payload: media
    };
  }
}
