import { AuthorizationFire } from '../services/firebase/firebase-auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as fromUser from '@store/user-profile';

import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

@Injectable()
export class AuthEffects {
  @Effect() init$ = defer(() => this.fb.auth.take(2))
    .map(() => ({
      type: fromUser.UserProfileActions.USER_SIGNIN_SILENT
    }));

  @Effect()
  silentLogin$ = this.actions$
    .ofType(fromUser.UserProfileActions.USER_SIGNIN_SILENT)
    .switchMap(() => {
      // debugger;
      return this.fb.auth.take(2);
    })
    .map((user: firebase.User) => {
      // console.log(user);
      // debugger;
      return {
        type: 'firebase login',
        payload: user ? user.toJSON() : {}
      };
    });

  constructor(
    private actions$: Actions,
    private fb: AuthorizationFire
  ) { }
}
