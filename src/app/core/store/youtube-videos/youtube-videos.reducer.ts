import { ActionReducer, Action } from '@ngrx/store';
import { YoutubeVideosActions } from './youtube-videos.actions';
type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | Object;
export interface EchoesVideos extends Array<GoogleApiYoutubeVideo> {};

export const videos: ActionReducer<EchoesVideos> = (state: EchoesVideos = [], action: Action) => {

  switch (action.type) {
    case YoutubeVideosActions.ADD:
      return [...state, ...action.payload];

    case YoutubeVideosActions.REMOVE:
      return state;

    case YoutubeVideosActions.RESET:
      return [];

    case YoutubeVideosActions.UPDATE_METADATA:
      const amountOfResults = 50;
      const bottomLimit = state.length === 0 ? state.length : state.length - amountOfResults;
      const copyOfLastState = [...state].filter((video, index) => index < bottomLimit);
      return [...copyOfLastState, ...action.payload];

    default:
      return state;
  }
};
