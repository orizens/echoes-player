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

        default:
            return state;
    }
}

export function addVideos(state: EchoesVideos, videos: GoogleApiYouTubeSearchResource[]) {
    return state.concat(videos);
}
