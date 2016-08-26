import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// MODULES
// import { InfiniteScroll } from 'angular2-infinite-scroll';
// import { InfiniteScrollModule } from './core/directives/infinite-scroll';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

// COMPONENTS
import { YoutubePlayer } from './youtube-player/youtube-player';
import { NowPlaylist } from './now-playlist';
import { NowPlaylistFilter } from './now-playlist-filter';
import { YoutubeVideos, PlayerSearch } from './youtube-videos';
import { UserArea } from './user-area';
// import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';

// SERVICES
import { YoutubeSearch } from './core/services/youtube.search';
import { YoutubePlayerService } from './core/services/youtube-player.service';
import { NowPlaylistService } from './core/services/now-playlist.service';
import services from './core/services';

// NGRX
import { Store, StoreModule } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import store from './core/store';
import { actions } from './core/store';
import effects from './core/effects';

import 'rxjs/Rx';
// App is our top level component
import { App } from './app.component';
// import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// import { AppState } from './app.service';

// Application wide providers
const APP_PROVIDERS = services;
// [
  // ...APP_RESOLVER_PROVIDERS,
  // AppState
// ];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    YoutubePlayer,
    NowPlaylist,
    NowPlaylistFilter,
    YoutubeVideos,
    UserArea,
    PlayerSearch
    // StoreLogMonitorComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore(store),
    // runEffects(effects),
    // actions
    InfiniteScrollModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    runEffects(effects),
    actions
  ]
})
export class AppModule {
  // constructor(public appRef: ApplicationRef) {}
  // hmrOnInit(store) {
    // if (!store || !store.state) return;
    // console.log('HMR store', store);
    // this.appState.state = store.state;
    // delete store.state;
  // }
  // hmrOnDestroy(store) {
  //   var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // recreate elements
  //   var state = this.appState.state;
  //   store.state = state;
  //   store.disposeOldHosts = createNewHosts(cmpLocation)
  //   // remove styles
  //   removeNgStyles();
  // }
  // hmrAfterDestroy(store) {
  //   // display new elements
  //   store.disposeOldHosts()
  //   delete store.disposeOldHosts;
  // }
}
