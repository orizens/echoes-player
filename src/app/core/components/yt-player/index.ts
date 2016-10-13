import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubePlayer } from './youtube-player.component';
import { YoutubePlayerService } from './youtube-player.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    YoutubePlayer
  ],
  exports: [
    YoutubePlayer
  ],
  providers: [
    YoutubePlayerService
  ]
})
export class YoutubePlayerModule { }
