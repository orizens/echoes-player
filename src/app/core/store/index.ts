import { NgModule } from '@angular/core';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
// import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { environment } from '@env/environment';
import { EchoesState, EchoesReducers, EchoesActions } from './reducers';
// import { NavigationSerializer } from './router-store';

// import { storeFreeze } from 'ngrx-store-freeze';

export { EchoesState } from './reducers';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: Object.keys(EchoesReducers),
    rehydrate: true
  })(reducer);
}
const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
const optionalImports = [];
if (!environment.production) {
  
}

@NgModule({
  imports: [
    StoreModule.forRoot(EchoesReducers, { metaReducers }),
    // StoreRouterConnectingModule,
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  declarations: [],
  exports: [],
  providers: [
    ...EchoesActions
    // { provide: RouterStateSerializer, useClass: NavigationSerializer }
  ]
})
export class CoreStoreModule {}
