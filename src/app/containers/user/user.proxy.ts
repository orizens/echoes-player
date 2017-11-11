import { getIsUserSignedIn$, getUserPlaylists$ } from '../../core/store/user-profile/user-profile.selectors';
import { EchoesState } from '../../core/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class UserProxy {
  public isSignedIn$ = this.store.let(getIsUserSignedIn$);
  public userPlaylists$ = this.store.let(getUserPlaylists$);

  constructor(private store: Store<EchoesState>) { }
}
