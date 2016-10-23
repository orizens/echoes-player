import { Injectable } from '@angular/core';
import { ActionReducer, Action } from '@ngrx/store';
import { AppLayoutActions } from './app-layout.actions';

export interface AppLayout {
  sidebarExpanded: boolean;
}
let initialState: any = {
  sidebarExpanded: true
};
export const appLayout: ActionReducer<AppLayout> = (
  state: AppLayout = initialState,
  action: Action) => {

  switch (action.type) {
    case AppLayoutActions.SIDEBAR_EXPAND:
      return Object.assign({}, state, { sidebarExpanded: true });

    case AppLayoutActions.SIDEBAR_COLLAPSE:
      return Object.assign({}, state, { sidebarExpanded: false });

    case AppLayoutActions.SIDEBAR_TOGGLE:
      return Object.assign({}, state, { sidebarExpanded: !state.sidebarExpanded });

    default:
      return state;
  }
};
