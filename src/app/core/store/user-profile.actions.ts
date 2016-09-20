import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class UserProfileActions {
  static UPDATE = 'UPDATE';
  static ADD_PLAYLISTS = 'ADD_PLAYLISTS';
  addPlaylists(playlists: Array<any>) {
    return {
      type: UserProfileActions.ADD_PLAYLISTS,
      payload: playlists
    }
  }
  static UPDATE_TOKEN = 'UPDATE_TOKEN';
  updateToken(token: string) {
    return {
      type: UserProfileActions.UPDATE_TOKEN,
      payload: token
    }
  }
  static LOG_OUT = 'LOG_OUT';
  signOut() {
    return {
      type: UserProfileActions.LOG_OUT
    }
  }
}
