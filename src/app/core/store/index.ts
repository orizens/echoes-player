import { Observable } from 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import 'rxjs/add/operator/let';

import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// reducers
import { videos, EchoesVideos, YoutubeVideosActions } from './youtube-videos';
import { player, YoutubePlayerState, PlayerActions } from './youtube-player';
import { nowPlaylist, YoutubeMediaPlaylist, NowPlaylistActions } from './now-playlist';
import { user, UserProfileData, UserProfileActions } from './user-profile';
import { search, PlayerSearch, PlayerSearchActions } from './player-search';
import { appLayout, AppLayoutActions, AppLayout, getSidebarExpanded } from './app-layout';
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
  appLayout: AppLayout;
}

const actions = [
  NowPlaylistActions,
  PlayerActions,
  UserProfileActions,
  YoutubeVideosActions,
  PlayerSearchActions,
  AppLayoutActions
];

const composeStore = compose(
  localStorageSync(['videos', 'player', 'nowPlaylist', 'search', 'appLayout'], true),
  combineReducers
)({ videos, player, nowPlaylist, user, search, appLayout });

const optionalImports = [];

if ('production' !== ENV) {
    // Note that you must instrument after importing StoreModule
    optionalImports.push(StoreDevtoolsModule.instrumentStore({
      // maxAge: 5
    }));
}
@NgModule({
  imports: [
    StoreModule.provideStore(composeStore),
    ...optionalImports
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [ ...actions ]
})
export class CoreStoreModule {};

// shared selectors
function getAppLayoutState(state$: Observable<EchoesState>) {
  return state$.select(state => state.appLayout);
}
export const getSidebarCollapsed = compose(getSidebarExpanded, getAppLayoutState);
