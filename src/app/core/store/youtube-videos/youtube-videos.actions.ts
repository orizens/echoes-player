import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class YoutubeVideosActions {
  static ADD = '[YoutubeVideos] ADD_VIDEOS';
  addVideo(videos: GoogleApiYouTubeVideoResource[]): Action {
    return {
      type: YoutubeVideosActions.ADD,
      payload: videos
    }
  }
  static REMOVE = '[YoutubeVideos] REMOVE';
  removeVideo(): Action {
    return {
      type: YoutubeVideosActions.REMOVE
    }
  }
  static RESET = '[YoutubeVideos] RESET';
  reset(): Action {
    return {
      type: YoutubeVideosActions.RESET
    }
  }
  static UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA';
  updateMetaData(videos): Action {
    return {
      type: YoutubeVideosActions.UPDATE_METADATA,
      payload: videos
    }
  }
}
