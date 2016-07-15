import { ActionReducer, Action } from '@ngrx/store';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const RESET = 'RESET';

export interface EchoesVideos extends Array<GoogleApiYouTubeSearchResource>{};

export const videos: ActionReducer<GoogleApiYouTubeSearchResource[]> = (state: EchoesVideos = [], action: Action) => {

    switch (action.type) {
        case ADD:
            return addVideos(state, action.payload);

        case REMOVE:
            return state;

        case RESET:
            return [];

        default:
            return state;
    }
}

export function addVideos(state: EchoesVideos, videos: GoogleApiYouTubeSearchResource[]) {
    return state.concat(videos);
}
