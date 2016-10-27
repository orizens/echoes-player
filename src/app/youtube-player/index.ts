import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { YoutubePlayer } from './youtube-player.component';
import { MediaInfoComponent } from './media-info';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    YoutubePlayer,
    MediaInfoComponent
  ],
  exports: [
    YoutubePlayer
  ]
})
export class PlayerModule { }
