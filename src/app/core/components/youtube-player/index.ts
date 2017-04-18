import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';

import { PlayerComponent } from './ep-player.component';
import { MediaInfoComponent } from './media-info';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlayerResizerComponent } from './player-resizer/player-resizer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PlayerComponent,
    MediaInfoComponent,
    PlayerControlsComponent,
    PlayerResizerComponent
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
