import { ActionReducer, Action } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { compose } from "@ngrx/core/compose";
// reducers
import { videos, EchoesVideos } from './youtube-videos';
import { player, YoutubePlayerState} from './youtube-player';
import { nowPlaylist, YoutubeMediaPlaylist} from './now-playlist';
import { user, UserProfile } from './user-manager';
import { search, PlayerSearch} from './player-search';
import { localStorageSync } from './ngrx-store-localstorage';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface EchoesState {
  videos: EchoesVideos;
  player: YoutubePlayerState;
  nowPlaylist: YoutubeMediaPlaylist;
  user: UserProfile;
  search: PlayerSearch;
}

export default compose(
  localStorageSync(['videos', 'player', 'nowPlaylist', 'search'], true),
  combineReducers
)({ videos, player, nowPlaylist, user, search });
