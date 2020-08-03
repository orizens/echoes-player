import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { NowPlayingComponent } from './now-playing.component';
import { NowPlaylistComponent, NowPlaylistTrackComponent } from './now-playlist';
import { NowPlaylistFilterComponent } from './now-playlist-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    SharedModule,
    DragDropModule
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
