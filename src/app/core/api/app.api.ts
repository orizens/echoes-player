import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { EchoesState } from '@store/reducers';

// Actions
import * as AppLayout from '@store/app-layout';
import * as RouterActions from '@store/router-store';
import * as UserActions from '@store/user-profile';

@Injectable()
export class AppApi {
  themes$ = this.store.select(AppLayout.getAppThemes);
  appVersion$ = this.store.select(AppLayout.getAppVersion);
  user$ = this.store.select(UserActions.getUser);

  constructor(private store: Store<EchoesState>) {}

  toggleSidebar() {
    this.store.dispatch(new AppLayout.ToggleSidebar());
  }

  navigateBack() {
    this.store.dispatch(new RouterActions.Back());
  }

  updateVersion() {
    this.store.dispatch(new AppLayout.UpdateAppVersion());
  }

  checkVersion() {
    this.store.dispatch(new AppLayout.CheckVersion());
  }

  changeTheme(theme: string) {
    this.store.dispatch(new AppLayout.ThemeChange(theme));
  }

  notifyNewVersion(response) {
    this.store.dispatch(new AppLayout.RecievedAppVersion(response));
  }

  recievedNewVersion(response) {
    this.store.dispatch(new AppLayout.RecievedAppVersion(response));
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
}
