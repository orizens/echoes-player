import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { combineReducers, compose, Store, StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import 'rxjs/add/operator/let';

import { environment } from '../../../environments/environment';
import { EchoesState, EchoesReducers, EchoesActions } from './reducers';

// import { storeFreeze } from 'ngrx-store-freeze';

export { EchoesState } from './reducers';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: Object.keys(EchoesReducers),
    rehydrate: true
  })(reducer);
}
const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];
const optionalImports = [];
// const appReducer = compose(localStorageSync(Object.keys(EchoesReducers), true), combineReducers)(
//   EchoesReducers
// );
if (!environment.production) {
  // Note that you must instrument after importing StoreModule
  optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
}

@NgModule({
  imports: [StoreModule.forRoot(EchoesReducers, { metaReducers }), ...optionalImports],
  declarations: [],
  exports: [],
  providers: [...EchoesActions]
})
export class CoreStoreModule {}

// shared selectors
function getAppLayoutState(state$: Store<EchoesState>) {
  return state$.select(state => state.appLayout);
}
export function getSidebarCollapsed$(state$: Store<EchoesState>) {
  return state$.select(state => state.appLayout.sidebarExpanded);
}
