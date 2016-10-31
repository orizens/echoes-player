import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class YoutubeVideosActions {
  static ADD = '[YoutubeVideos] ADD_VIDEOS';
  static REMOVE = '[YoutubeVideos] REMOVE';
  static RESET = '[YoutubeVideos] RESET';
  static UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA';

  addVideos(videos: GoogleApiYouTubeVideoResource[]): Action {
    return {
      type: YoutubeVideosActions.ADD,
      payload: videos
    };
  }

  removeVideo(): Action {
    return {
      type: YoutubeVideosActions.REMOVE
    };
  }

  reset(): Action {
    return {
      type: YoutubeVideosActions.RESET
    };
  }

  updateMetaData(videos): Action {
    return {
      type: YoutubeVideosActions.UPDATE_METADATA,
      payload: videos
    };
  }
}
