import { PlaylistVideosResolver } from '../../core/resolvers/playlist-videos.resolver';
import { PlaylistResolver } from '../../core/resolvers/playlist.resolver';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaygroundComponent } from './playground.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'playground', component: PlaygroundComponent,
    // resolve: {
    //   videos: PlaylistVideosResolver,
    //   playlist: PlaylistResolver
    // }
  }
]);
