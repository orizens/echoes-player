import { YoutubeTopicComponent } from './youtube-topic.component';
// import { PlaylistResolver, PlaylistVideosResolver } from '@shared/components/playlist-view';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeVideosComponent } from './youtube-videos.component';
//import { YoutubeTopicComponent } from './youtube-topics.component';
import { AppSearchComponent } from './app-search.component';
import { YoutubePlaylistsComponent } from './youtube-playlists.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'search', component: AppSearchComponent,
    children: [
      { path: '', redirectTo: 'videos', pathMatch: 'full' },
      { path: 'videos', component: YoutubeVideosComponent },
      { path: 'playlists', component: YoutubePlaylistsComponent }
    ]
  },
  {
    path: 'genre', component: AppSearchComponent,
    children: [
      { path: '', redirectTo: 'jazz', pathMatch: 'full' },
      { path: 'pop', component: YoutubeTopicComponent },
      { path: 'rnb', component: YoutubeTopicComponent },
      { path: 'jazz', component: YoutubeTopicComponent },
      { path: 'electronic', component: YoutubeTopicComponent },
      { path: 'hiphop', component: YoutubeTopicComponent },
      { path: 'rock', component: YoutubeTopicComponent }
    ]
  }
]);
