import { NgModule } from '@angular/core';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';

import { YoutubePlayer } from './youtube-player.component';
import { MediaInfoComponent } from './media-info';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlayerResizerComponent } from './player-resizer/player-resizer.component';

@NgModule({
  imports: [
    SharedModule,
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
