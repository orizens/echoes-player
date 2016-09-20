import { ActionReducer, Action } from '@ngrx/store';
import { UserProfileActions } from './user-profile.actions';

export * from './user-profile.actions';

export interface UserProfile {
    access_token: string,
    playlists: Array<any>
}

let initialUserState = {
    access_token: '',
    playlists: []
}
export const user: ActionReducer<UserProfile> = (state = initialUserState, action: Action) => {

    switch (action.type) {
        case UserProfileActions.ADD_PLAYLISTS:
            return Object.assign({}, state, { playlists: [ ...state.playlists, ...action.payload ]});

        case UserProfileActions.UPDATE_TOKEN:
            return Object.assign({}, state, { access_token: action.payload, playlists: [] });

        case UserProfileActions.LOG_OUT:
            return Object.assign({}, {
                access_token: '',
                playlists: []
            });

        default:
            return state;
    }
}
