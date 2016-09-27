import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { NowPlaying } from './now-playing.component';
import { NowPlaylist } from './now-playlist';
import { NowPlaylistFilter } from './now-playlist-filter';

@NgModule({
  imports: [
    CoreModule
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
