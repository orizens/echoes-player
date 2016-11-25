import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from '../action-creator.util';

@Injectable()
export class YoutubeVideosActions {
  static ADD = '[YoutubeVideos] ADD_VIDEOS';
  static REMOVE = '[YoutubeVideos] REMOVE';
  static RESET = '[YoutubeVideos] RESET';
  static UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA';

  addVideos = ActionCreatorFactory.create<GoogleApiYouTubeVideoResource[]>(YoutubeVideosActions.ADD);
  removeVideo = ActionCreatorFactory.create<void>(YoutubeVideosActions.REMOVE);
  reset = ActionCreatorFactory.create<void>(YoutubeVideosActions.RESET);
  updateMetaData = ActionCreatorFactory.create<GoogleApiYouTubeVideoResource[]>(YoutubeVideosActions.UPDATE_METADATA);
}
