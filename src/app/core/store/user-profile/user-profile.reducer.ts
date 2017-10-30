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
}

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
interface UnsafeAction extends Action {
  payload: any;
}
export function user(state = initialUserState, action: UnsafeAction): IUserProfile {
  switch (action.type) {
    case UserProfileActions.ADD_PLAYLISTS:
      return { ...state, playlists: [...state.playlists, ...action.payload] };

    case UserProfileActions.UPDATE_TOKEN:
      return { ...state, access_token: action.payload, playlists: [] };

    case UserProfileActions.LOG_OUT:
      return { ...initialUserState };

    case UserProfileActions.UPDATE:
      return { ...state, data: action.payload };

    case UserProfileActions.UPDATE_NEXT_PAGE_TOKEN:
      return { ...state, nextPageToken: action.payload };

    case UserProfileActions.UPDATE_USER_PROFILE:
      return { ...state, profile: action.payload };

    case UserProfileActions.VIEWED_PLAYLIST:
      return { ...state, viewedPlaylist: action.payload };

    default:
      return state;
  }
}
