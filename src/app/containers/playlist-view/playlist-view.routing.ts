import { PlaylistVideosResolver } from '../../core/resolvers/playlist-videos.resolver';
import { PlaylistResolver } from '../../core/resolvers/playlist.resolver';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistViewComponent } from './playlist-view.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'playlist/:id', component: PlaylistViewComponent,
    resolve: {
      videos: PlaylistVideosResolver,
      playlist: PlaylistResolver
    }
  }
]);
