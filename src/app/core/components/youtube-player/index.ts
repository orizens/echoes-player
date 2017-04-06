import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';

import { YoutubePlayerComponent } from './youtube-player.component';
import { MediaInfoComponent } from './media-info';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlayerResizerComponent } from './player-resizer/player-resizer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    YoutubePlayerComponent,
    MediaInfoComponent,
    PlayerControlsComponent,
    PlayerResizerComponent
  ],
  exports: [
    YoutubePlayerComponent
  ]
})
export class PlayerModule { }
