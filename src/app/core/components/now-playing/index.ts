import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';

import { NowPlayingComponent } from './now-playing.component';
import { NowPlaylistComponent } from './now-playlist';
import { NowPlaylistFilterComponent } from './now-playlist-filter';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NowPlayingComponent,
    NowPlaylistComponent,
    NowPlaylistFilterComponent
  ],
  exports: [
    NowPlayingComponent
  ]
})
export class NowPlayingModule { }
