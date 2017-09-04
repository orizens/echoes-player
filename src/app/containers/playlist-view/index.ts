import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { AppNavbarModule } from '../app-navbar';
import { PlaylistViewComponent } from './playlist-view.component';

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
  providers: []
})
export class PlaylistViewModule { }
