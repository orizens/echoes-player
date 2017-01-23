import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { CoreStoreModule } from './store';
import effects from './effects';

import { APP_SERVICES } from './services';

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
    ...APP_SERVICES
  ]
})
export class CoreModule { }
