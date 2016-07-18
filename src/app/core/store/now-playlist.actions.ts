import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class NowPlaylistActions {
  static QUEUE_LOAD_VIDEO = 'QUEUE_LOAD_VIDEO';
  queueLoadVideo(media): Action {
    return {
      type: NowPlaylistActions.QUEUE_LOAD_VIDEO,
      payload: media
    }
  }
  static QUEUE = 'QUEUE';
  queueVideo(media: GoogleApiYouTubeVideoResource): Action {
    return {
      type: NowPlaylistActions.QUEUE,
      payload: media
    }
  }
  static QUEUE_LOAD_VIDEO_SUCCESS = 'QUEUE_LOAD_VIDEO_SUCCESS';
  static SELECT = 'SELECT';
  static REMOVE = 'REMOVE';
  static UPDATE_INDEX = 'UPDATE_INDEX';
  updateIndexByMedia(mediaId: string): Action {
    return {
      type: NowPlaylistActions.UPDATE_INDEX,
      payload: mediaId
    };
  }
  static QUEUE_FAILED = 'QUEUE_FAILED';
  queueFailed(media): Action {
    return {
      type: NowPlaylistActions.QUEUE_FAILED,
      payload: media
    }
  }
  static FILTER_CHANGE = 'FILTER_CHANGE';
  static REMOVE_ALL = 'REMOVE_ALL';
  static SELECT_NEXT = 'SELECT_NEXT';
  static QUEUE_VIDEOS = 'QUEUE_VIDEOS';
}
