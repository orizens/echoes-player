import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { PlaygroundComponent } from './playground.component';
import { PlaygroundProxy } from './playground.proxy';

import { routing } from './playground.routing';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    PlaygroundComponent
  ],
  exports: [
    PlaygroundComponent
  ],
  providers: [
    PlaygroundProxy
  ]
})
export class PlaygroundModule { }
