import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-imports.guards';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { APP_APIS } from './api';

@NgModule({
  imports: [CoreStoreModule, AppEffectsModules],
  declarations: [],
  exports: [CoreStoreModule],
  providers: [...APP_SERVICES, ...APP_RESOLVERS, ...APP_APIS]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }
}
