import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AppLayoutActions {
  static SIDEBAR_EXPAND = '[APP LAYOUT] SIDEBAR_EXPAND';
  static SIDEBAR_COLLAPSE = '[APP LAYOUT] SIDEBAR_COLLAPSE';
  static SIDEBAR_TOGGLE = '[APP LAYOUT] SIDEBAR_TOGGLE';

  expandSidebar(): Action {
    return {
      type: AppLayoutActions.SIDEBAR_EXPAND,
      payload: true
    };
  }

  collapseSidebar(): Action {
    return {
      type: AppLayoutActions.SIDEBAR_COLLAPSE,
      payload: false
    };
  }

  toggleSidebar(): Action {
    return {
      type: AppLayoutActions.SIDEBAR_TOGGLE
    };
  }
};
