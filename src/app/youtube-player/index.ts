import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { YoutubePlayer } from './youtube-player.component';
import { MediaInfoComponent } from './media-info';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlayerResizerComponent } from './player-resizer/player-resizer.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    YoutubePlayer,
    MediaInfoComponent,
    PlayerControlsComponent,
    PlayerResizerComponent
  ],
  exports: [
    YoutubePlayer
  ]
})
export class PlayerModule { }
