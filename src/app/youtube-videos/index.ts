import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { YoutubeVideosComponent } from './youtube-videos.component';
import { PlayerSearch } from './player-search.component';
import { routing } from './youtube-videos.routing';

@NgModule({
  imports: [
    CoreModule,
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
