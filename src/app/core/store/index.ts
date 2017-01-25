import { Observable } from 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import 'rxjs/add/operator/let';

import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
// import { NgrxActionCreatorFactoryModule } from './action-creator.util';

import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getSidebarExpanded } from './app-layout';
import { storeRegistry, registerReducers } from './store.registry';

import { reducersRegisters, EchoesState } from './reducers';

import { localStorageSync } from 'ngrx-store-localstorage';

export { EchoesState } from './reducers';
const { actions, reducers } = registerReducers(reducersRegisters);

const composeStore = compose(
  localStorageSync(['videos', 'player', 'nowPlaylist', 'search', 'appLayout'], true),
  combineReducers
)(reducers);

const optionalImports = [];

if ('production' !== ENV) {
    // Note that you must instrument after importing StoreModule
    optionalImports.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}
@NgModule({
  imports: [
    StoreModule.provideStore(composeStore),
    ...optionalImports
  ],
  declarations: [],
  exports: [],
  providers: [ ...actions, ActionCreatorFactory ]
})
export class CoreStoreModule {};

// shared selectors
function getAppLayoutState(state$: Observable<EchoesState>) {
  return state$.select(state => state.appLayout);
}
export const getSidebarCollapsed$ = compose(getSidebarExpanded, getAppLayoutState);
