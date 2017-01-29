import { Observable } from 'rxjs/Rx';
import { ActionReducer, Action } from '@ngrx/store';
import { YoutubeVideosActions } from './youtube-videos.actions';
type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | Object;
//DEPRECATED
export interface EchoesVideos {
  videos: GoogleApiYoutubeVideo[];
  isSearching: boolean;
}

let initialState: EchoesVideos = {
  videos: [],
  isSearching: false
};

export const videos: ActionReducer<EchoesVideos> = (
  state: EchoesVideos = initialState,
  action: Action
  ) => {

  switch (action.type) {
    case YoutubeVideosActions.ADD:
      return Object.assign({}, state, { videos: [...state.videos, ...action.payload] });

    case YoutubeVideosActions.REMOVE:
      return state;

    case YoutubeVideosActions.RESET:
      return Object.assign({}, state, { videos: [] });

    case YoutubeVideosActions.SEARCH_STARTED:
      return Object.assign({}, state, { isSearching: action.payload });

    default:
      return state;
  }
};

export const videosRegister = {
  reducer: { videos },
  actions: YoutubeVideosActions
};
