import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { AppNavbarModule } from '../app-navbar';
import { YoutubeVideosComponent } from './youtube-videos.component';
import { PlayerSearch } from './player-search.component';
import { routing } from './youtube-videos.routing';

@NgModule({
  imports: [
    CoreModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    YoutubeVideosComponent,
    PlayerSearch
  ],
  exports: [
    YoutubeVideosComponent
  ],
  providers: []
})
export class YoutubeVideosModule { }
