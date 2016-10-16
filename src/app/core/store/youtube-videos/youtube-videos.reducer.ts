import { ActionReducer, Action } from '@ngrx/store';
import { YoutubeVideosActions } from './youtube-videos.actions';

export interface EchoesVideos extends Array<GoogleApiYouTubeSearchResource>{};

export const videos: ActionReducer<GoogleApiYouTubeSearchResource[]> = (state: EchoesVideos = [], action: Action) => {

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
}

export function addVideos(state: EchoesVideos, videos: GoogleApiYouTubeSearchResource[]) {
  return state.concat(videos);
}
