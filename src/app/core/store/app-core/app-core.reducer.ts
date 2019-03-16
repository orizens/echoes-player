import { Store } from '@ngrx/store';
import { ActionTypes, Action } from './app-core.actions';
import { Themes, DEFAULT_THEME } from '../../../app.themes';

export enum ErrorActions {
  RELOAD = 'Reload',
  NONE = 0,
  RESET = 1
}
export enum ErrorMessages {
  OFFLINE = 'No Connection Available',
  RESPONSE_ERROR = 'Error With Providing Response'
}
export interface IAppVersion {
  semver: string;
  isNewAvailable: boolean;
  checkingForVersion: boolean;
}
export interface IAppError {
  message: string;
  show: boolean;
  action: ErrorActions;
}
export interface IAppCore {
  sidebarExpanded: boolean;
  requestInProcess: boolean;
  version: IAppVersion;
  theme: string;
  themes: string[];
  error: IAppError;
}
const initialState: IAppCore = {
  sidebarExpanded: true,
  requestInProcess: false,
  version: {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  },
  theme: DEFAULT_THEME,
  themes: Themes.sort(),
  error: {
    message: '',
    show: false,
    action: ErrorActions.NONE
  }
};

export function appCore(
  state: IAppCore = initialState,
  action: Action
): IAppCore {
  switch (action.type) {
    case ActionTypes.SIDEBAR_EXPAND:
      return { ...state, sidebarExpanded: true };

    case ActionTypes.SIDEBAR_COLLAPSE:
      return { ...state, sidebarExpanded: false };

    case ActionTypes.SIDEBAR_TOGGLE:
      return { ...state, sidebarExpanded: !state.sidebarExpanded };

    case ActionTypes.APP_VERSION_RECIEVED: {
      const version = getVersion(state, action.payload);
      return { ...state, version };
    }

    case ActionTypes.APP_CHECK_VERSION: {
      const version = {
        ...state.version,
        checkingForVersion: true
      };
      return { ...state, version };
    }

    case ActionTypes.APP_THEME_CHANGE: {
      return { ...state, theme: action.payload };
    }

    case ActionTypes.ERROR_ADD: {
      const { payload: { message } } = action;
      return {
        ...state,
        error: {
          message,
          show: true,
          action: ErrorActions.RELOAD
        }
      };
    }

    case ActionTypes.ERROR_CLEAN: {
      return {
        ...state,
        error: {
          ...initialState.error
        }
      };
    }

    case ActionTypes.TOGGLE_ERROR: {
      return {
        ...state,
        error: {
          ...initialState.error,
          show: false
        }
      };
    }

    default:
      return {
        ...initialState,
        ...state,
        themes: Themes.sort()
      };
  }
}

export function getSidebarExpanded($state: Store<IAppCore>) {
  return $state.select(state => state.sidebarExpanded);
}

function getVersion(state: IAppCore, packageJson: any): IAppVersion {
  const currentVersion = state.version.semver;
  const remoteVersion = packageJson.version;
  const version: IAppVersion = {
    semver: '',
    isNewAvailable: state.version.isNewAvailable,
    checkingForVersion: false
  };
  const isCurrentVersionEmpty = '' === currentVersion;
  const isCurrentDifferentFromRemote =
    !isCurrentVersionEmpty && currentVersion !== remoteVersion;
  if (isCurrentVersionEmpty) {
    version.semver = remoteVersion;
  }
  if (isCurrentDifferentFromRemote && !version.isNewAvailable) {
    version.semver = currentVersion;
    version.isNewAvailable = true;
  } else {
    // upgrade is completed
    version.semver = remoteVersion;
    version.isNewAvailable = false;
  }
  return version;
}
