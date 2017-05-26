import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { AppSearchComponent } from './app-search.component';
import { AppNavbarModule } from '../app-navbar';
import { YoutubeVideosComponent } from './youtube-videos.component';
import { YoutubePlaylistsComponent } from './youtube-playlists.component';
import { PlayerSearchComponent } from './player-search.component';
import { TypeAheadComponent } from './typeahead.directive';
import { LoadingIndicatorComponent } from './loading-indicator';
import { routing } from './app-search.routing';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    AppSearchComponent,
    YoutubeVideosComponent,
    YoutubePlaylistsComponent,
    PlayerSearchComponent,
    TypeAheadComponent,
    LoadingIndicatorComponent
  ],
  exports: [
    AppSearchComponent
  ],
  providers: []
})
export class AppSearchModule { }
