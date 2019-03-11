import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { EchoesState } from '@store/reducers';

// Actions
import * as AppCore from '@store/app-core';
import * as RouterActions from '@store/router-store';
import * as UserActions from '@store/user-profile';

@Injectable()
export class AppApi {
  themes$ = this.store.select(AppCore.getAppThemes);
  appVersion$ = this.store.select(AppCore.getAppVersion);
  user$ = this.store.select(UserActions.getUser);

  constructor(private store: Store<EchoesState>) {}

  toggleSidebar() {
    this.store.dispatch(new AppCore.ToggleSidebar());
  }

  navigateBack() {
    this.store.dispatch(new RouterActions.Back());
  }

  updateVersion() {
    this.store.dispatch(new AppCore.UpdateAppVersion());
  }

  checkVersion() {
    this.store.dispatch(new AppCore.CheckVersion());
  }

  changeTheme(theme: string) {
    this.store.dispatch(new AppCore.ThemeChange(theme));
  }

  notifyNewVersion(response) {
    this.store.dispatch(new AppCore.RecievedAppVersion(response));
  }

  recievedNewVersion(response) {
    this.store.dispatch(new AppCore.RecievedAppVersion(response));
  }

  // AUTHORIZATION
  signinUser() {
    this.store.dispatch(new UserActions.UserSignin());
  }

  signoutUser() {
    this.store.dispatch(new UserActions.UserSignout());
  }

  checkUserAuth() {
    this.store.dispatch(new UserActions.CheckUserAuth());
  }

  notifyError(error) {
    this.store.dispatch(new AppCore.AddError(error));
  }
}
