import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { ActionTypes } from './app-layout.actions';

export interface IAppVersion {
  semver: string;
  isNewAvailable: boolean;
  checkingForVersion: boolean;
}
export interface IAppSettings {
  sidebarExpanded: boolean;
  requestInProcess: boolean;
  version: IAppVersion;
}
const initialState: IAppSettings = {
  sidebarExpanded: true,
  requestInProcess: false,
  version: {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  }
};
// TODO - create Actions types as in migration guide for @ngrx
interface UnsafeAction extends Action {
  payload?: any;
}
export function appLayout(state: IAppSettings = initialState, action: UnsafeAction): IAppSettings {
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

    default:
      return { ...initialState, ...state };
  }
}

export function getSidebarExpanded($state: Store<IAppSettings>) {
  return $state.select(state => state.sidebarExpanded);
}

function getVersion(state: IAppSettings, packageJson: any): IAppVersion {
  const currentVersion = state.version.semver;
  const remoteVersion = packageJson.version;
  const version: IAppVersion = {
    semver: '',
    isNewAvailable: state.version.isNewAvailable,
    checkingForVersion: false
  };
  const isCurrentVersionEmpty = '' === currentVersion;
  const isCurrentDifferentFromRemote = !isCurrentVersionEmpty && currentVersion !== remoteVersion;
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
