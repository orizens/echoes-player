import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
// import { InfiniteScrollModule } from './directives/infinite-scroll';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { CORE_COMPONENTS } from './components';
// import { YoutubePlayerModule } from './components/yt-player';
import { PIPES } from './pipes';

import { CoreStoreModule } from './store';
import effects from './effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreStoreModule,
    YoutubePlayerModule,
    InfiniteScrollModule,
    ...effects.map(effect => EffectsModule.run(effect)),
  ],
  declarations: [
    ...CORE_COMPONENTS,
    ...PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ...CORE_COMPONENTS,
    ...PIPES,
    CoreStoreModule,
    InfiniteScrollModule,
    YoutubePlayerModule,
  ],
  providers: [

  ]
})
export class CoreModule { }
