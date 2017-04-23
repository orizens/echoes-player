import { Observable } from 'rxjs/Observable';
import { EchoesState } from '../';
import { Action } from '@ngrx/store';
import { UserProfileActions } from './user-profile.actions';

export * from './user-profile.actions';

export interface IUserProfile {
  access_token: string;
  playlists: GoogleApiYouTubePlaylistResource[];
  data?: {};
  nextPageToken?: string;
  profile: GoogleBasicProfile;
  viewedPlaylist?: string;
};
 export interface GoogleBasicProfile {
  name?: string;
  imageUrl?: string;
 }

const initialUserState: IUserProfile = {
  access_token: '',
  playlists: [],
  data: {},
  nextPageToken: '',
  profile: {},
  viewedPlaylist: ''
};
export function user(state = initialUserState, action: Action): IUserProfile {

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

    case UserProfileActions.VIEWED_PLAYLIST:
    return Object.assign({}, state, { viewedPlaylist: action.payload });

    default:
    return state;
  }
};

export const userRegister = {
  reducer: { user },
  actions: UserProfileActions
};
