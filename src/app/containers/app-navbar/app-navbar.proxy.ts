import { AuthorizationFire } from '../../core/services/firebase';
import { EchoesState } from '../../core/store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { getUser$, getUserPhoto$ } from '../../core/store/user-profile/user-profile.selectors';
import { getAppVersion$ } from '../../core/store/app-layout';

@Injectable()
export class AppNavbarProxy {
  user$ = this.store.let(getUser$);
  userPhoto$ = this.store.let(getUserPhoto$);
  appVersion$ = this.store.let(getAppVersion$);

  constructor(
    private store: Store<EchoesState>,
    private auth: AuthorizationFire,
  ) { }

  get isSignedIn() {
    return this.auth.isSignedIn;
  }
}
