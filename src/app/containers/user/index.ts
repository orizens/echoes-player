import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AppNavbarModule } from '../app-navbar';

import { UserComponent } from './user.component';
import { PlaylistsComponent } from './playlists';
import { PlaylistComponent, PlaylistCoverComponent, PlaylistResolver, PlaylistVideosResolver } from './playlist';

import { AuthGuard } from './user.guard';
import { UserPlayerService } from './user-player.service';
import { routing } from './user.routing';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    UserComponent,
    PlaylistsComponent,
    PlaylistComponent,
    PlaylistCoverComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [ AuthGuard, UserPlayerService, PlaylistResolver, PlaylistVideosResolver ]
})
export class UserModule { }
