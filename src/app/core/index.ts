import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { CORE_COMPONENTS } from './components';
import { YoutubePlayerModule } from './components/yt-player';
import { SearchPipe } from './pipes/search.pipe';

import { CoreStoreModule } from './store';
import effects from './effects';

@NgModule({
  imports: [
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
    CoreStoreModule,
    YoutubePlayerModule,
    ...effects.map(effect => EffectsModule.run(effect)),
  ],
  declarations: [
    ...CORE_COMPONENTS,
    SearchPipe
  ],
  exports: [
    InfiniteScrollModule,
    ...CORE_COMPONENTS,
    CommonModule,
    FormsModule,
    CoreStoreModule,
    YoutubePlayerModule,
    SearchPipe
  ],
  providers: [

  ]
})
export class CoreModule { }
