import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class UserProfileActions {
  static UPDATE = '@UserProfile UPDATE';
  updateData(data: any) {
    return {
      type: UserProfileActions.UPDATE,
      payload: data
    }
  }
  static ADD_PLAYLISTS = '@UserProfile ADD_PLAYLISTS';
  addPlaylists(playlists: Array<any>) {
    return {
      type: UserProfileActions.ADD_PLAYLISTS,
      payload: playlists
    }
  }
  static UPDATE_TOKEN = '@UserProfile UPDATE_TOKEN';
  updateToken(token: string) {
    return {
      type: UserProfileActions.UPDATE_TOKEN,
      payload: token
    }
  }
  static LOG_OUT = '@UserProfile LOG_OUT';
  signOut() {
    return {
      type: UserProfileActions.LOG_OUT
    }
  }
  static UPDATE_NEXT_PAGE_TOKEN = '@UserProfile UPDATE_NEXT_PAGE_TOKEN'
  updatePageToken(token: string) {
    return {
      type: UserProfileActions.UPDATE_NEXT_PAGE_TOKEN,
      payload: token
    }
  }
  static USER_PROFILE_COMPLETED = '@UserProfile USER_PROFILE_COMPLETED'
  userProfileCompleted() {
    return {
      type: UserProfileActions.USER_PROFILE_COMPLETED
    }
  }
}
