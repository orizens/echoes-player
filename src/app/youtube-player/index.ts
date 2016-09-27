import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { YoutubePlayer } from './youtube-player.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    YoutubePlayer
  ],
  exports: [
    YoutubePlayer
  ]
})
export class YoutubePlayerModule { }
