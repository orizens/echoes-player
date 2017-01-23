import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';

import { NowPlaying } from './now-playing.component';
import { NowPlaylist } from './now-playlist';
import { NowPlaylistFilter } from './now-playlist-filter';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NowPlaying,
    NowPlaylist,
    NowPlaylistFilter
  ],
  exports: [
    NowPlaying
  ]
})
export class NowPlayingModule { }
