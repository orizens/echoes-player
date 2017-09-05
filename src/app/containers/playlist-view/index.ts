import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { AppNavbarModule } from '../app-navbar';
import { PlaylistViewComponent } from './playlist-view.component';
import { PlaylistProxy } from './playlist-view.proxy';

import { routing } from './playlist-view.routing';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    PlaylistViewComponent
  ],
  exports: [
    PlaylistViewComponent
  ],
  providers: [
    PlaylistProxy
  ]
})
export class PlaylistViewModule { }
