import { Observable } from 'rxjs/Rx';
// reducers
import { videosRegister, EchoesVideos } from './youtube-videos';
import { playerRegister, YoutubePlayerState } from './youtube-player';
import { nowPlaylistRegister, YoutubeMediaPlaylist } from './now-playlist';
import { userRegister, UserProfileData } from './user-profile';
import { searchRegister, PlayerSearch } from './player-search';
import { appLayoutRegister, AppLayout } from './app-layout';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface EchoesState {
  videos: EchoesVideos;
  player: YoutubePlayerState;
  nowPlaylist: YoutubeMediaPlaylist;
  user: UserProfileData;
  search: PlayerSearch;
  appLayout: AppLayout;
};

export const reducersRegisters = [
  videosRegister,
  playerRegister,
  nowPlaylistRegister,
  userRegister,
  searchRegister,
  appLayoutRegister
];

export const getVideos$ = (state$: Observable<EchoesState>): Observable<EchoesVideos> => {
  return state$.select(state => state.videos);
};

export const getPlayer$ = (state$: Observable<EchoesState>): Observable<YoutubePlayerState> => {
  return state$.select(state => state.player);
};

export const getPlayerSearch$ = (state$: Observable<EchoesState>): Observable<PlayerSearch> => {
  return state$.select(state => state.search);
};

export const getPlayerSearchResults$ = (state$: Observable<EchoesState>): Observable<any[]> => {
  return state$.select(state => state.search.results);
};

export const getAppLayout$ = ($state: Observable<EchoesState>): Observable<AppLayout> => {
  return $state.select(state => state.appLayout);
};
