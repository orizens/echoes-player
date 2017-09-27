import { PlaylistVideosResolver } from '../../core/resolvers/playlist-videos.resolver';
import { PlaylistResolver } from '../../core/resolvers/playlist.resolver';

import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { PlaylistsComponent } from './playlists';
import { PlaylistViewComponent } from '../playlist-view/playlist-view.component';
import { AuthGuard } from './user.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'user', component: UserComponent,
    children: [
    { path: '', redirectTo: 'playlists', pathMatch: 'full' },
    { path: 'playlists', component: PlaylistsComponent },
  ]},
  { path: 'user/playlist/:id', component: PlaylistViewComponent,
    canActivate: [ AuthGuard ], canActivateChild: [ AuthGuard ],
    resolve: {
      videos: PlaylistVideosResolver,
      playlist: PlaylistResolver
    }
  }
]);
