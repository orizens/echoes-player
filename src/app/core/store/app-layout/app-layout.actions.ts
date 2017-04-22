import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class AppLayoutActions {
  static SIDEBAR_EXPAND = '[APP LAYOUT] SIDEBAR_EXPAND';
  static SIDEBAR_COLLAPSE = '[APP LAYOUT] SIDEBAR_COLLAPSE';
  static SIDEBAR_TOGGLE = '[APP LAYOUT] SIDEBAR_TOGGLE';

  static APP_VERSION_RECIEVED = '[APP] APP_VERSION_RECIEVED';
  static APP_UPDATE_VERSION = '[APP] APP_UPDATE_VERSION';
  static APP_CHECK_VERSION = '[APP] APP_CHECK_VERSION';

  recievedAppVersion = ActionCreatorFactory.create<any>(AppLayoutActions.APP_VERSION_RECIEVED);
  updateAppVersion = ActionCreatorFactory.create(AppLayoutActions.APP_UPDATE_VERSION);
  checkVersion = ActionCreatorFactory.create(AppLayoutActions.APP_CHECK_VERSION);

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
