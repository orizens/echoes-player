import {Reducer, Action} from '@ngrx/store';

export const SELECT = 'SELECT';
export const QUEUE = 'QUEUE';
export const REMOVE = 'REMOVE';
export const UPDATE_INDEX = 'UPDATE_INDEX';
export const FILTER_CHANGE = 'FILTER_CHANGE';
export const REMOVE_ALL = 'REMOVE_ALL';

export interface YoutubeMediaPlaylist {
    videos: GoogleApiYouTubeSearchResource[],
    index: number,
    filter: string
}
let initialState: YoutubeMediaPlaylist = {
    videos: [],
    index: 0,
    filter: ''
}
export const nowPlaylist: Reducer<any> = (state: YoutubeMediaPlaylist = initialState, action: Action) => {
    let matchMedia = (media) => media.id.videoId === action.payload.id.videoId;
    let isDifferent = (media) => media.id.videoId !== action.payload.id.videoId;

    switch (action.type) {
        case SELECT:
            return Object.assign({}, state, { index: state.videos.findIndex(matchMedia) });

        case QUEUE:
            return Object.assign({}, state, { videos: [ ...state.videos, action.payload ]});

        case REMOVE:
            return Object.assign({}, state, { videos: state.videos.filter(isDifferent) });

        case UPDATE_INDEX:
            return Object.assign({}, state, { index: action.payload });

        case FILTER_CHANGE:
            return Object.assign({}, state, { filter: action.payload });

        case REMOVE_ALL:
            return Object.assign({}, state, { videos: [], filter: '', index: 0 });

        default:
            return state;
    }
}