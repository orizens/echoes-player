import { IAppSettings, IAppVersion } from '../store/app-layout/app-layout.reducer';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DEFAULT_THEME, Themes } from '../../app.themes';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const INIT_STATE: IAppSettings = {
  sidebarExpanded: true,
  requestInProcess: false,
  version: {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  },
  theme: DEFAULT_THEME,
  themes: Themes.sort()
};


@Injectable()
export class AppLayoutService {
  appLayout$: Observable<IAppSettings>;
  private appLayoutSubject: BehaviorSubject<IAppSettings>;

  constructor() {
    this.appLayoutSubject = new BehaviorSubject(INIT_STATE);
    this.appLayout$ = this.appLayoutSubject.asObservable();

  }

  static getVersion(state: IAppSettings, packageJson: any): IAppVersion {
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

  recievedAppVersion(payload: any) {
    const appSettings = this.appLayoutSubject.getValue();
    const version = AppLayoutService.getVersion(appSettings, payload);
    this.appLayoutSubject.next({
      ...appSettings, version
    });
  }

  checkVersion() {
    // case ActionTypes.APP_CHECK_VERSION: {
    //     const version = {
    //       ...state.version,
    //       checkingForVersion: true
    //     };
    //     return { ...state, version };
    //   }
    const appSettings = this.appLayoutSubject.getValue();
    const version = {
      ...appSettings.version,
      checkingForVersion: true
    };

    this.appLayoutSubject.next({
      ...appSettings, version
    });
  }

  toggleSidebar() {
    // return { ...state, sidebarExpanded: !state.sidebarExpanded };
    const appSettings = this.appLayoutSubject.getValue();

    this.appLayoutSubject.next({
      ...appSettings, sidebarExpanded: !appSettings.sidebarExpanded
    });
  }

  changeTheme(theme: string) {
    const appSettings = this.appLayoutSubject.getValue();

    this.appLayoutSubject.next({
      ...appSettings, theme
    });
  }
}
