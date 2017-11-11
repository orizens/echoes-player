import { Action } from '@ngrx/store';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { Injectable } from '@angular/core';
import { GoogleBasicProfile } from './user-profile.reducer';

@Injectable()
export class UserProfileActions {
  static UPDATE = '[UserProfile] UPDATE';
  static ADD_PLAYLISTS = '[UserProfile] ADD_PLAYLISTS';
  static UPDATE_TOKEN = '[UserProfile] UPDATE_TOKEN';
  static SIGNOUT = '[UserProfile] SIGNOUT';
  static SIGNOUT_COMPLETED = '[UserProfile] SIGNOUT_COMPLETED';
  static SIGNIN = '[UserProfile] SIGNIN';
  static SIGNIN_SUCCESS = '[UserProfile] SIGNIN_SUCCESS';
  static UPDATE_NEXT_PAGE_TOKEN = '[UserProfile] UPDATE_NEXT_PAGE_TOKEN';
  static USER_PROFILE_COMPLETED = '[UserProfile] USER_PROFILE_COMPLETED';
  static UPDATE_USER_PROFILE = '[UserProfile] UPDATE_USER_PROFILE';
  static USER_PROFILE_RECIEVED = '[UserProfile] USER_PROFILE_RECIEVED';
  static VIEWED_PLAYLIST = '[UserProfile] VIEWED_PLAYLIST';

  setViewPlaylist = ActionCreatorFactory.create<string>(UserProfileActions.VIEWED_PLAYLIST);

  updateData = (data: any) => ({ type: UserProfileActions.UPDATE, payload: data });

  addPlaylists(playlists: Array<any>) {
    return {
      type: UserProfileActions.ADD_PLAYLISTS,
      payload: playlists
    };
  }

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

  updateUserProfile(profile: GoogleBasicProfile) {
    return {
      type: UserProfileActions.UPDATE_USER_PROFILE,
      payload: profile
    };
  }
}

export class UpdateToken implements Action {
  public type = UserProfileActions.UPDATE_TOKEN;
  constructor(public payload: string) { }
}

export class ProfileRecieved implements Action {
  public type = UserProfileActions.USER_PROFILE_RECIEVED;
  constructor(public payload: gapi.auth2.BasicProfile) { }
}

export class Signout implements Action {
  public type = UserProfileActions.SIGNOUT;
  public payload = '';
}

export class Signin implements Action {
  public type = UserProfileActions.SIGNIN;
  public payload = '';
}

export class SigninSuccess implements Action {
  public type = UserProfileActions.SIGNIN_SUCCESS;
  constructor(public payload: any) { }
}

export class SignoutCompleted implements Action {
  public type = UserProfileActions.SIGNOUT_COMPLETED;
  public payload = '';
}

export type Actions =
  UpdateToken
  | ProfileRecieved
  | Signout
  | Signin
  | SigninSuccess;
