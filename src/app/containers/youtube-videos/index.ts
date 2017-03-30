import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { AppNavbarModule } from '../app-navbar';
import { YoutubeVideosComponent } from './youtube-videos.component';
import { PlayerSearch } from './player-search.component';
import { TypeAheadComponent } from './typeahead.directive';
import { LoadingIndicatorComponent } from './loading-indicator';
import { routing } from './youtube-videos.routing';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    YoutubeVideosComponent,
    PlayerSearch,
    TypeAheadComponent,
    LoadingIndicatorComponent
  ],
  exports: [
    YoutubeVideosComponent
  ],
  providers: []
})
export class YoutubeVideosModule { }
