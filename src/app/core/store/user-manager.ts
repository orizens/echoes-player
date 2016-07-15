import {ActionReducer, Action} from '@ngrx/store';

export const UPDATE = 'UPDATE';
export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const LOG_OUT = 'LOG_OUT';

export interface UserProfile {
    access_token: string,
    playlists: Array<any>
}

let initialUserState = {
    access_token: null,
    playlists: []
}
export const user: ActionReducer<UserProfile> = (state = initialUserState, action: Action) => {

    switch (action.type) {
        case ADD_PLAYLISTS:
            return Object.assign({}, state, { playlists: [ ...state.playlists, ...action.payload ]});

        case UPDATE_TOKEN:
            return Object.assign({}, state, { access_token: action.payload, playlists: [] });

        case LOG_OUT:
            return Object.assign({}, {
                access_token: null,
                playlists: []
            });

        default:
            return state;
    }
}
