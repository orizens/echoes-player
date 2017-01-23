import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { CoreStoreModule } from './store';
import effects from './effects';

@NgModule({
  imports: [
    CoreStoreModule,
    ...effects.map(effect => EffectsModule.run(effect)),
  ],
  declarations: [
  ],
  exports: [
    CoreStoreModule,
  ],
  providers: [

  ]
})
export class CoreModule { }
