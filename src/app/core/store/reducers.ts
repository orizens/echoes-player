import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionReducerMap, Store } from '@ngrx/store';
// import { routerReducer, RouterReducerState } from '@ngrx/router-store';

// reducers
import { IAppPlayer, player, ActionTypes } from './app-player';
import { INowPlaylist, nowPlaylist } from './now-playlist';
import { IUserProfile, user, UserProfileActions } from './user-profile';
import { IPlayerSearch, search, PlayerSearchActions } from './player-search';
import { IAppSettings, appLayout } from './app-layout';

// The top level Echoes Player application interface
// each reducer is reponsible for manipulating a certain state
export interface EchoesState {
  player: IAppPlayer;
  nowPlaylist: INowPlaylist;
  user: IUserProfile;
  search: IPlayerSearch;
  appLayout: IAppSettings;
  // routerReducer: RouterReducerState;
}

export let EchoesReducers: ActionReducerMap<EchoesState> = {
  player,
  nowPlaylist,
  user,
  search,
  appLayout
  // routerReducer
};

export let EchoesActions = [
  ActionTypes,
  UserProfileActions,
  PlayerSearchActions
];
