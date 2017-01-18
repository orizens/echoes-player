import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from '../action-creator.util';

@Injectable()
export class YoutubeVideosActions {
  static ADD = '[YoutubeVideos] ADD_VIDEOS';
  static REMOVE = '[YoutubeVideos] REMOVE';
  static RESET = '[YoutubeVideos] RESET';
  static UPDATE_METADATA = '[YoutubeVideos] UPDATE_METADATA';
  static ADD_FOR_PROCESSING = '[YoutubeVideos] ADD_FOR_PROCESSING';
  static SEARCH_STARTED = '[YoutubeVideos] IS_SEARCHING';

  addVideos = ActionCreatorFactory.create<GoogleApiYouTubeVideoResource[]>(YoutubeVideosActions.ADD);
  removeVideo = ActionCreatorFactory.create(YoutubeVideosActions.REMOVE);
  reset = ActionCreatorFactory.create(YoutubeVideosActions.RESET);
  updateMetaData = ActionCreatorFactory.create<GoogleApiYouTubeVideoResource[]>(YoutubeVideosActions.UPDATE_METADATA);
  addForProcessing = ActionCreatorFactory
    .create<GoogleApiYouTubeSearchResource[]>(YoutubeVideosActions.ADD_FOR_PROCESSING);
  searchStarted = ActionCreatorFactory.create<boolean>(YoutubeVideosActions.SEARCH_STARTED);
}
