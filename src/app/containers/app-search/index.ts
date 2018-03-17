import { AppBrandModule } from './../../core/components/app-brand';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { AppSearchComponent } from './app-search.component';
import { AppNavbarModule } from '../app-navbar';
import { YoutubeVideosComponent } from './youtube-videos.component';
import { YoutubePlaylistsComponent } from './youtube-playlists.component';
import { PlayerSearchComponent } from './player-search.component';
import { SearchNavigatorComponent } from './search-navigator';
import { routing } from './app-search.routing';
import { AppBrandComponent } from '~/app/core/components/app-brand/app-brand.component';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    ReactiveFormsModule,
    AppBrandModule,
    routing
  ],
  declarations: [
    AppSearchComponent,
    YoutubeVideosComponent,
    YoutubePlaylistsComponent,
    PlayerSearchComponent,
    SearchNavigatorComponent
  ],
  exports: [
    AppSearchComponent
  ],
  providers: []
})
export class AppSearchModule { }
