import { NgModule } from '@angular/core';
import { CoreModule } from '../core';
import { AppNavbarModule } from '../app-navbar';
import { YoutubeVideos } from './youtube-videos.component';
import { PlayerSearch } from './player-search.component';
import { routing } from './youtube-videos.routing';

@NgModule({
  imports: [
    CoreModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    YoutubeVideos,
    PlayerSearch
  ],
  exports: [
    YoutubeVideos
  ],
  providers: []
})
export class YoutubeVideosModule { }
