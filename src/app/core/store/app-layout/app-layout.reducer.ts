import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { AppLayoutActions } from './app-layout.actions';

export interface AppLayout {
  sidebarExpanded: boolean;
  requestInProcess: boolean;
}
let initialState: any = {
  sidebarExpanded: true,
  requestInProcess: false
};
export function appLayout (state: AppLayout = initialState, action: Action): AppLayout {
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

export const appLayoutRegister = {
  reducer: { appLayout },
  actions: AppLayoutActions
};

export function getSidebarExpanded($state: Observable<AppLayout>) {
  return $state.select(state => state.sidebarExpanded);
}
