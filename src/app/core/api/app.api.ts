import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { EchoesState } from '../store';
import * as AppLayout from '../store/app-layout';
import * as RouterActions from '../store/router-store';
import * as UserActions from '../store/user-profile';

@Injectable()
export class AppApi {
  constructor(
    private store: Store<EchoesState>
  ) { }

  toggleSidebar() {
    this.store.dispatch(new AppLayout.ToggleSidebar());
  }

  navigateBack() {
    this.store.dispatch(new RouterActions.Back());
  }

  // USER actions
  signIn() {
    return this.store.dispatch(new UserActions.Signin());
  }

  updateToken(token) {
    return this.store.dispatch(new UserActions.UpdateToken(token));
  }

  updateProfile(profile) {
    return this.store.dispatch(new UserActions.ProfileRecieved(profile));
  }

  signOut() {
    return this.store.dispatch(new UserActions.Signout());
  }

  // APP actions
  updateVersion() {
    return this.store.dispatch(new AppLayout.UpdateAppVersion());
  }

  checkVersion() {
    return this.store.dispatch(new AppLayout.CheckVersion());
  }
}
