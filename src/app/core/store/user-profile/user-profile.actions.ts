import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { Injectable } from '@angular/core';
import { GoogleBasicProfile } from './user-profile.reducer';
import { Action } from '@ngrx/store';

@Injectable()
export class UserProfileActions {
  static UPDATE = '[UserProfile] UPDATE';
  static ADD_PLAYLISTS = '[UserProfile] ADD_PLAYLISTS';
  static UPDATE_TOKEN = '[UserProfile] UPDATE_TOKEN';
  static UPDATE_NEXT_PAGE_TOKEN = '[UserProfile] UPDATE_NEXT_PAGE_TOKEN';
  static USER_PROFILE_COMPLETED = '[UserProfile] USER_PROFILE_COMPLETED';
  static UPDATE_USER_PROFILE = '[UserProfile] UPDATE_USER_PROFILE';
  static USER_PROFILE_RECIEVED = '[UserProfile] USER_PROFILE_RECIEVED';
  static VIEWED_PLAYLIST = '[UserProfile] VIEWED_PLAYLIST';

  static CHECK_USER_AUTH = '[UserProfile] CHECK_USER_AUTH';
  static USER_SIGNIN = '[UserProfile] USER_SIGNIN';
  static USER_SIGNIN_START = '[UserProfile] USER_SIGNIN_START';
  static USER_SIGNIN_SUCCESS = '[UserProfile] USER_SIGNIN_SUCCESS';

  static USER_SIGNOUT = '[UserProfile] USER_SIGNOUT';
  static USER_SIGNOUT_SUCCESS = '[UserProfile] USER_SIGNOUT_SUCCESS';
  static USER_PLAYLISTS_FETCH_ERROR = '[UserProfile] USER_PLAYLISTS_FETCH_ERROR';

  setViewPlaylist = ActionCreatorFactory.create<string>(UserProfileActions.VIEWED_PLAYLIST);

  updateData = (data: any) => ({ type: UserProfileActions.UPDATE, payload: data });

  addPlaylists(playlists: Array<any>) {
    return {
      type: UserProfileActions.ADD_PLAYLISTS,
      payload: playlists
    };
  }

  updateToken = (payload: string) => ({ type: UserProfileActions.UPDATE_TOKEN, payload });

  updatePageToken(token: string) {
    return {
      type: UserProfileActions.UPDATE_NEXT_PAGE_TOKEN,
      payload: token
    };
  }

  userProfileCompleted() {
    return {
      type: UserProfileActions.USER_PROFILE_COMPLETED
    };
  }

  userProfileRecieved(profile: any) {
    return {
      type: UserProfileActions.USER_PROFILE_RECIEVED,
      payload: profile
    };
  }

  updateUserProfile(profile: GoogleBasicProfile) {
    return {
      type: UserProfileActions.UPDATE_USER_PROFILE,
      payload: profile
    };
  }
}

export class UserSignin implements Action {
  readonly type = UserProfileActions.USER_SIGNIN;
  constructor() {}
}

export class UserSigninStart implements Action {
  readonly type = UserProfileActions.USER_SIGNIN_START;
  constructor() {}
}

export class UserSigninSuccess implements Action {
  readonly type = UserProfileActions.USER_SIGNIN_SUCCESS;
  constructor(public payload: gapi.auth2.GoogleUser) { }
}

export class UserSignout implements Action {
  readonly type = UserProfileActions.USER_SIGNOUT;
}

export class UserSignoutSuccess implements Action {
  readonly type = UserProfileActions.USER_SIGNOUT_SUCCESS;
  constructor() {}
}

export class CheckUserAuth implements Action {
  readonly type = UserProfileActions.CHECK_USER_AUTH;
  constructor () {}
}
export class UserPlaylistsFetchError implements Action {
  readonly type = UserProfileActions.USER_PLAYLISTS_FETCH_ERROR;
  constructor (public payload: any) {}
}
