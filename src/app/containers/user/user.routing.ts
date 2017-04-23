import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { PlaylistsComponent } from './playlists';
import { PlaylistComponent, PlaylistResolver, PlaylistVideosResolver } from './playlist';
import { AuthGuard } from './user.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'user', component: UserComponent,
    children: [
    { path: '', redirectTo: 'playlists', pathMatch: 'full' },
    { path: 'playlists', component: PlaylistsComponent },
    { path: 'playlist/:id', component: PlaylistComponent,
      canActivate: [ AuthGuard ], canActivateChild: [ AuthGuard ],
      resolve: {
        videos: PlaylistVideosResolver,
        playlist: PlaylistResolver
      }
    }
  ]}
]);
