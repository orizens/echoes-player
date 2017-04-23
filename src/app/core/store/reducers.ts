import { Observable } from 'rxjs/Observable';
// reducers
import { playerRegister, AppPlayerState, player, AppPlayerActions } from './app-player';
import { nowPlaylistRegister, NowPlaylistInterface, nowPlaylist, NowPlaylistActions } from './now-playlist';
import { userRegister, IUserProfile, user, UserProfileActions } from './user-profile';
import { searchRegister, PlayerSearch, search, PlayerSearchActions } from './player-search';
import { appLayoutRegister, IAppSettings, appLayout, AppLayoutActions } from './app-layout';

// The top level Echoes Player application interface
// each reducer is reponsible for manipulating a certain state
export interface EchoesState {
  player: AppPlayerState;
  nowPlaylist: NowPlaylistInterface;
  user: IUserProfile;
  search: PlayerSearch;
  appLayout: IAppSettings;
};

export let EchoesReducers = {
  player,
  nowPlaylist,
  user,
  search,
  appLayout,
};

export let EchoesActions = [
  AppPlayerActions,
  NowPlaylistActions,
  UserProfileActions,
  PlayerSearchActions,
  AppLayoutActions
];

export function getAppReducersRegistry() {
  return [
    playerRegister,
    nowPlaylistRegister,
    userRegister,
    searchRegister,
    appLayoutRegister
  ];
};

export function getPlayerSearch$ (state$: Observable<EchoesState>): Observable<PlayerSearch> {
  return state$.select(state => state.search);
};

export function getPlayerSearchResults$ (state$: Observable<EchoesState>): Observable<any[]> {
  return state$.select(state => state.search.results);
};

export function getAppLayout$ ($state: Observable<EchoesState>): Observable<IAppSettings> {
  return $state.select(state => state.appLayout);
};

export function getNowPlaylist$ ($state: Observable<EchoesState>): Observable<NowPlaylistInterface> {
  return $state.select(state => state.nowPlaylist);
};
