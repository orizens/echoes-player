import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';

import { AppPlayerComponent } from './app-player.component';
import { MediaInfoComponent } from './media-info';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlayerResizerComponent } from './player-resizer/player-resizer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AppPlayerComponent,
    MediaInfoComponent,
    PlayerControlsComponent,
    PlayerResizerComponent
  ],
  exports: [
    AppPlayerComponent
  ]
})
export class AppPlayerModule { }
