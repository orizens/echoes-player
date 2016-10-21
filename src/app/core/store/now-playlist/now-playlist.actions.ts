import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class NowPlaylistActions {
  static QUEUE_LOAD_VIDEO = 'QUEUE_LOAD_VIDEO';
  static QUEUE = 'QUEUE';
  static QUEUE_LOAD_VIDEO_SUCCESS = 'QUEUE_LOAD_VIDEO_SUCCESS';
  static SELECT = 'SELECT';
  static REMOVE = 'REMOVE';
  static UPDATE_INDEX = 'UPDATE_INDEX';
  static QUEUE_FAILED = 'QUEUE_FAILED';
  static FILTER_CHANGE = 'FILTER_CHANGE';
  static REMOVE_ALL = 'REMOVE_ALL';
  static SELECT_NEXT = 'SELECT_NEXT';
  static QUEUE_VIDEOS = 'QUEUE_VIDEOS';

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
}
