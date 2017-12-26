import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { NowPlayingComponent } from './now-playing.component';
import { NowPlaylistComponent, NowPlaylistTrackComponent } from './now-playlist';
import { NowPlaylistFilterComponent } from './now-playlist-filter';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NowPlayingComponent,
    NowPlaylistComponent,
    NowPlaylistTrackComponent,
    NowPlaylistFilterComponent
  ],
  exports: [
    NowPlayingComponent
  ]
})
export class NowPlayingModule { }
