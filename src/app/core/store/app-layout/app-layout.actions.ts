import { Action } from '@ngrx/store';

export class ActionTypes {
  static SIDEBAR_EXPAND = '[APP LAYOUT] SIDEBAR_EXPAND';
  static SIDEBAR_COLLAPSE = '[APP LAYOUT] SIDEBAR_COLLAPSE';
  static SIDEBAR_TOGGLE = '[APP LAYOUT] SIDEBAR_TOGGLE';

  static APP_VERSION_RECIEVED = '[APP] APP_VERSION_RECIEVED';
  static APP_UPDATE_VERSION = '[APP] APP_UPDATE_VERSION';
  static APP_CHECK_VERSION = '[APP] APP_CHECK_VERSION';

  static APP_THEME_CHANGE = '[App Theme] APP_THEME_CHANGE';
}
export class RecievedAppVersion implements Action {
  public type = ActionTypes.APP_VERSION_RECIEVED;
  constructor(public payload: any) { }
}
export class UpdateAppVersion implements Action {
  public type = ActionTypes.APP_UPDATE_VERSION;
  public payload = '';
}
export class CheckVersion implements Action {
  public type = ActionTypes.APP_CHECK_VERSION;
  public payload = '';
}
export class ExpandSidebar implements Action {
  public type = ActionTypes.SIDEBAR_EXPAND;
  public payload = true;
}

export class CollapseSidebar implements Action {
  public type = ActionTypes.SIDEBAR_COLLAPSE;
  public payload = false;
}

export class ToggleSidebar implements Action {
  public type = ActionTypes.SIDEBAR_TOGGLE;
  public payload = '';
}

export class ThemeChange implements Action {
  public type = ActionTypes.APP_THEME_CHANGE;
  constructor(public payload: string) { }
}

export type Action =
  | RecievedAppVersion
  | UpdateAppVersion
  | CheckVersion
  | ExpandSidebar
  | CollapseSidebar
  | ToggleSidebar
  | ThemeChange;
