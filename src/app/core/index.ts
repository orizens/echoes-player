import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-imports.guards';

import { CoreStoreModule } from './store';
import { AppEffectsModules } from './effects';

import { APP_SERVICES } from './services';
import { APP_RESOLVERS } from './resolvers';
import { APP_APIS } from './api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './services/app-http-interceptor';

@NgModule({
  imports: [CoreStoreModule, AppEffectsModules],
  declarations: [],
  exports: [CoreStoreModule],
  providers: [
    ...APP_SERVICES,
    ...APP_RESOLVERS,
    ...APP_APIS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
  // }
}
