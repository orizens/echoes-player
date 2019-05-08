import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { AppPlayerComponent } from './app-player.component';
import { MediaInfoComponent } from './media-info';
import { PlayerControlsComponent } from './player-controls/player-controls.component';
import { PlayerResizerComponent } from './player-resizer/player-resizer.component';
import { ImageBlurComponent } from './image-blur';
import { TrackInfoComponent } from './track-info/track-info.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    AppPlayerComponent,
    MediaInfoComponent,
    PlayerControlsComponent,
    PlayerResizerComponent,
    ImageBlurComponent,
    TrackInfoComponent
  ],
  exports: [AppPlayerComponent]
})
export class AppPlayerModule {}
