import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeVideosComponent } from './youtube-videos.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: YoutubeVideosComponent }
]);
