import { ActionReducer, Action } from '@ngrx/store';
import { UserProfileActions } from './user-profile.actions';

export * from './user-profile.actions';

export interface UserProfileData {
  access_token: string;
  playlists: GoogleApiYouTubePlaylistResource[];
  data?: any;
  nextPageToken?: string;
  profile: GoogleBasicProfile;
};
 export interface GoogleBasicProfile {
  name?: string;
  imageUrl?: string;
 }

let initialUserState = {
  access_token: '',
  playlists: [],
  data: {},
  nextPageToken: '',
  profile: {}
};
export const user: ActionReducer<UserProfileData> = (state = initialUserState, action: Action) => {

  switch (action.type) {
    case UserProfileActions.ADD_PLAYLISTS:
    return Object.assign({}, state, { playlists: [ ...state.playlists, ...action.payload ]});

    case UserProfileActions.UPDATE_TOKEN:
    return Object.assign({}, state, { access_token: action.payload, playlists: [] });

    case UserProfileActions.LOG_OUT:
    return Object.assign({}, {
      access_token: '',
      playlists: [],
      profile: {}
    });

    case UserProfileActions.UPDATE:
    return Object.assign({}, state, { data: action.payload });

    case UserProfileActions.UPDATE_NEXT_PAGE_TOKEN:
    return Object.assign({}, state, { nextPageToken: action.payload });

    case UserProfileActions.UPDATE_USER_PROFILE:
    return Object.assign({}, state, { profile: action.payload });

    default:
    return state;
  }
};

export const userRegister = {
  reducer: { user },
  actions: UserProfileActions
};
