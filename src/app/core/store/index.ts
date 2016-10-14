import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from "@ngrx/core/compose";
// reducers
import { videos, EchoesVideos, YoutubeVideosActions } from './youtube-videos';
import { player, YoutubePlayerState, PlayerActions} from './youtube-player';
import { nowPlaylist, YoutubeMediaPlaylist, NowPlaylistActions} from './now-playlist';
import { user, UserProfileData, UserProfileActions } from './user-profile';
import { search, PlayerSearch, PlayerSearchActions } from './player-search';
import { localStorageSync } from 'ngrx-store-localstorage';

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
}

const actions = [
  NowPlaylistActions,
  PlayerActions,
  UserProfileActions,
  YoutubeVideosActions,
  PlayerSearchActions
];

const composeStore = compose(
  localStorageSync(['videos', 'player', 'nowPlaylist', 'search'], true),
  combineReducers
)({ videos, player, nowPlaylist, user, search });

@NgModule({
  imports: [
    StoreModule.provideStore(composeStore),
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [ ...actions ]
})
export class CoreStoreModule {};
