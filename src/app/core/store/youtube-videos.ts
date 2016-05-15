import {Reducer, Action} from '@ngrx/store';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const RESET = 'RESET';

export const videos: Reducer<any> = (state: Array<any> = [], action: Action) => {

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

export function addVideos(state: Array<any>, videos: Array<any>) {
    return state.concat(videos);
}