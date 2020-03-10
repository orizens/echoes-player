import { Action } from '@ngrx/store';
import { IAppError } from './app-core.reducer';

export enum ActionTypes {
  SIDEBAR_EXPAND = '[APP CORE] SIDEBAR_EXPAND',
  SIDEBAR_COLLAPSE = '[APP CORE] SIDEBAR_COLLAPSE',
  SIDEBAR_TOGGLE = '[APP CORE] SIDEBAR_TOGGLE',

  APP_VERSION_RECIEVED = '[APP CORE] APP_VERSION_RECIEVED',
  APP_UPDATE_VERSION = '[APP CORE] APP_UPDATE_VERSION',
  APP_CHECK_VERSION = '[APP CORE] APP_CHECK_VERSION',

  APP_THEME_CHANGE = '[APP CORE] APP_THEME_CHANGE',

  ERROR_ADD = '[APP CORE] Error Add',
  ERROR_CLEAN = '[APP CORE] Error Clean',
  TOGGLE_ERROR = '[APP CORE] Error Toggle',

  SHOW_MODAL = 'modal/modalOpened',
  CLOSE_MODAL = 'modal/modalClosed'
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

export class AddError {
  public type = ActionTypes.ERROR_ADD;
  constructor(public payload: IAppError | any) { }
}

export class ToggleError {
  public type = ActionTypes.TOGGLE_ERROR;
  constructor(public payload = {}) { }
}

export class CleanError {
  public type = ActionTypes.ERROR_CLEAN;
  constructor(public payload = false) { }
}

export class ShowModal {
  public type = ActionTypes.SHOW_MODAL;
  constructor(public media, public payload = true) { }
}

export class CloseModal {
  public type = ActionTypes.CLOSE_MODAL;
  constructor(public payload = false) { }
}

export type Action =
  | RecievedAppVersion
  | UpdateAppVersion
  | CheckVersion
  | ExpandSidebar
  | CollapseSidebar
  | ToggleSidebar
  | ThemeChange
  | AddError
  | ToggleError
  | ShowModal
  | CloseModal;
