import { Observable } from 'rxjs/Observable';
// reducers
import { playerRegister, YoutubePlayerState, player, PlayerActions } from './youtube-player';
import { nowPlaylistRegister, NowPlaylistInterface, nowPlaylist, NowPlaylistActions } from './now-playlist';
import { userRegister, UserProfileData, user, UserProfileActions } from './user-profile';
import { searchRegister, PlayerSearch, search, PlayerSearchActions } from './player-search';
import { appLayoutRegister, AppLayout, appLayout, AppLayoutActions } from './app-layout';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface EchoesState {
  player: YoutubePlayerState;
  nowPlaylist: NowPlaylistInterface;
  user: UserProfileData;
  search: PlayerSearch;
  appLayout: AppLayout;
};

export let EchoesReducers = {
  player,
  nowPlaylist,
  user,
  search,
  appLayout,
};

export let EchoesActions = [
  PlayerActions,
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

export function getPlayer$ (state$: Observable<EchoesState>): Observable<YoutubePlayerState> {
  return state$.select(state => state.player);
};

export function getPlayerSearch$ (state$: Observable<EchoesState>): Observable<PlayerSearch> {
  return state$.select(state => state.search);
};

export function getPlayerSearchResults$ (state$: Observable<EchoesState>): Observable<any[]> {
  return state$.select(state => state.search.results);
};

export function getAppLayout$ ($state: Observable<EchoesState>): Observable<AppLayout> {
  return $state.select(state => state.appLayout);
};

export function getNowPlaylist$ ($state: Observable<EchoesState>): Observable<NowPlaylistInterface> {
  return $state.select(state => state.nowPlaylist);
};
