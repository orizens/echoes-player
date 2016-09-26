import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';

// COMPONENTS
import { CORE_COMPONENTS } from "./core/components";
import { YoutubePlayer } from './youtube-player/youtube-player';
import { YoutubeVideos, PlayerSearch } from './youtube-videos';
import { UserArea } from './user-area';
import { Navigator } from './navigator';
import { NowPlaying, NowPlaylist, NowPlaylistFilter } from './now-playing';
import { SearchPipe } from './core/pipes/search.pipe';
// import { Home } from './home';
// import { About } from './about';
// import { NoContent } from './no-content';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';

// SERVICES
import services from './core/services';

// NGRX
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import store from './core/store';
import { actions } from './core/store';
import effects from './core/effects';

import { NOTIFY_PROVIDERS, NOTIFY_GLOBAL_OPTIONS } from '@ngrx/notify';

import 'rxjs/Rx';
// Application wide providers
const APP_PROVIDERS = [
  // ...APP_RESOLVER_PROVIDERS,
  AppState,
  services,
  NOTIFY_PROVIDERS
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    ...CORE_COMPONENTS,
    YoutubePlayer,
    NowPlaying,
    NowPlaylist,
    NowPlaylistFilter,
    YoutubeVideos,
    UserArea,
    PlayerSearch,
    Navigator,
    SearchPipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore(store),
    ...effects.map(effect => EffectsModule.run(effect)),
    InfiniteScrollModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    // runEffects(effects),
    actions
  ]
})
export class AppModule {
  // constructor(public appRef: ApplicationRef, public appState: AppState) {}
  //
  // hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) return;
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   // set state
  //   this.appState._state = store.state;
  //   // set input values
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }
  //
  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }
  //
  // hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // save state
  //   const state = this.appState._state;
  //   store.state = state;
  //   // recreate root elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // save input values
  //   store.restoreInputValues  = createInputTransfer();
  //   // remove styles
  //   removeNgStyles();
  // }
  //
  // hmrAfterDestroy(store: StoreType) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}
