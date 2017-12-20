import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { EchoesState } from '../store';

// Actions
import * as AppLayout from '../store/app-layout';
import * as RouterActions from '../store/router-store';

// Selectors
import { getAppVersion$, getAppThemes } from '../store/app-layout';
import { getUser$ } from '../store/user-profile/user-profile.selectors';

@Injectable()
export class AppApi {
  themes$ = this.store.select(getAppThemes);
  appVersion$ = this.store.let(getAppVersion$);
  user$ = this.store.let(getUser$);

  constructor(
    private store: Store<EchoesState>
  ) { }

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
}
