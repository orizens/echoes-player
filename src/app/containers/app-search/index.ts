import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { AppSearchComponent } from './app-search.component';
import { AppNavbarModule } from '../app-navbar';
import { YoutubeVideosComponent } from './youtube-videos';
import { YoutubePlaylistsComponent } from './youtube-playlists';
import { PlayerSearchComponent } from './player-search';
import { SearchNavigatorComponent } from './search-navigator';
import { routing } from './app-search.routing';

@NgModule({
  imports: [SharedModule, AppNavbarModule, ReactiveFormsModule, routing],
  declarations: [
    AppSearchComponent,
    YoutubeVideosComponent,
    YoutubePlaylistsComponent,
    PlayerSearchComponent,
    SearchNavigatorComponent
  ],
  exports: [AppSearchComponent],
  providers: []
})
export class AppSearchModule {}
