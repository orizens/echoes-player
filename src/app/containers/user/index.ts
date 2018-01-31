import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';
import { AppNavbarModule } from '../app-navbar';

import { PlaylistViewModule } from '../playlist-view'

import { UserComponent } from './user.component';
import { PlaylistsComponent } from './playlists';
// import { PlaylistViewComponent, PlaylistResolver, PlaylistVideosResolver } from '@shared/components/playlist-view';

import { AuthGuard } from './user.guard';
import { UserPlayerService } from './user-player.service';
import { routing } from './user.routing';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    PlaylistViewModule,
    routing
  ],
  declarations: [
    UserComponent,
    PlaylistsComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [
    AuthGuard,
    UserPlayerService,
    // PlaylistResolver,
    // PlaylistVideosResolver
  ]
})
export class UserModule { }
