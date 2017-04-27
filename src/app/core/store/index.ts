import { Observable } from 'rxjs/Observable';
import { NgModule } from '@angular/core';
import { StoreModule, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import 'rxjs/add/operator/let';

// import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
// import { NgrxActionCreatorFactoryModule } from './action-creator.util';

import { environment } from '../../../environments/environment';
import { getSidebarExpanded } from './app-layout';
import { EchoesState, EchoesReducers, EchoesActions } from './reducers';

// import { storeFreeze } from 'ngrx-store-freeze';

export { EchoesState } from './reducers';
const actions = EchoesActions;
const reducers = EchoesReducers;
// const storageConfig = ['videos', 'player', 'nowPlaylist', 'search', 'appLayout'];
const composeStore = reducers;
const optionalImports = [];
const productionReducer = compose(localStorageSync(Object.keys(reducers), true), combineReducers)(reducers);
// const productionReducer = combineReducers(reducers);
// This is required for AOT
export function appReducer(state: any, action: any) {
  return productionReducer(state, action);
}
if (!environment.production) {
    // Note that you must instrument after importing StoreModule
    optionalImports.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}
@NgModule({
  imports: [
    StoreModule.provideStore(appReducer),
    ...optionalImports
  ],
  declarations: [],
  exports: [],
  providers: [ ...actions ]
})
export class CoreStoreModule {};

// shared selectors
function getAppLayoutState(state$: Observable<EchoesState>) {
  return state$.select(state => state.appLayout);
}
export function getSidebarCollapsed$(state$: Observable<EchoesState>) {
  return state$.select((state) => state.appLayout.sidebarExpanded);
}
