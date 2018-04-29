// import { PlaylistResolver, PlaylistVideosResolver } from '@shared/components/playlist-view';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeVideosComponent } from './youtube-videos';
import { AppSearchComponent } from './app-search.component';
import { YoutubePlaylistsComponent } from './youtube-playlists';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'search',
    component: AppSearchComponent,
    children: [
      { path: '', redirectTo: 'videos', pathMatch: 'full' },
      { path: 'videos', component: YoutubeVideosComponent },
      { path: 'playlists', component: YoutubePlaylistsComponent }
    ]
  }
]);
