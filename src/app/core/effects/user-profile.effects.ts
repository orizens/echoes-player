import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { UserProfileActions, GoogleBasicProfile } from '@store/user-profile';
import * as UserActions from '@store/user-profile';

import { UserProfile } from '@core/services/user-profile.service';
import { Authorization } from '@core/services/authorization.service';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private userProfileActions: UserProfileActions,
    private userProfile: UserProfile,
    private auth: Authorization
  ) { }

  @Effect() init$ = defer(() => this.auth.loadAuth())
    .map((googleUser: gapi.auth2.GoogleUser) => new UserActions.UserSigninSuccess(googleUser));

  @Effect()
  updateToken$ = this.actions$
    .ofType(UserProfileActions.UPDATE_TOKEN)
    .map(toPayload)
    .map((token: string) => (this.auth.accessToken = token))
    .switchMap(token =>
      this.userProfile.getPlaylists(true).catch((error: Error) => {
        console.log(`error in fetching user's playlists ${error}`);
        return of(error);
      })
    )
    .map(response => this.userProfileActions.updateData(response));

  @Effect()
  addUserPlaylists$ = this.actions$
    .ofType(UserProfileActions.UPDATE)
    .map(toPayload)
    .map((data: any) => this.userProfileActions.addPlaylists(data.items));

  @Effect()
  updateNextPageToken$ = this.actions$
    .ofType(UserProfileActions.UPDATE)
    .map(toPayload)
    .map(data => {
      const nextPageToken = data.nextPageToken;
      return nextPageToken
        ? this.userProfileActions.updatePageToken(data.nextPageToken)
        : this.userProfileActions.userProfileCompleted();
    });

  @Effect()
  getMorePlaylists$ = this.actions$
    .ofType(UserProfileActions.UPDATE_NEXT_PAGE_TOKEN)
    .map(toPayload)
    .switchMap((pageToken: string) => {
      this.userProfile.updatePageToken(pageToken);
      return this.userProfile.getPlaylists(false);
    })
    .map(response => this.userProfileActions.updateData(response));

  @Effect()
  userProfileRecieved$ = this.actions$
    .ofType(UserProfileActions.USER_PROFILE_RECIEVED)
    .map(toPayload)
    .map(profile => this.userProfile.toUserJson(profile))
    .map((profile: GoogleBasicProfile) => this.userProfileActions.updateUserProfile(profile));

  // SIGN IN/OUT EFFECTS
  @Effect()
  userSignin$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNIN)
    .map(() => new UserActions.UserSigninStart());

  @Effect()
  userSigninStart$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNIN_START)
    .switchMap(() => this.auth.signIn()
      .catch((error) => this.auth.handleFailedLogin(error)))
    .map((response: any) => new UserActions.UserSigninSuccess(response));

  @Effect({ dispatch: false })
  userSigninSuccess$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNIN_SUCCESS)
    .do((response: any) => this.auth.setAuthTimer(response));

  @Effect()
  updateTokenAfterSigninSuccess$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNIN_SUCCESS)
    .map(toPayload)
    .map((googleUser: gapi.auth2.GoogleUser) =>
      this.userProfileActions.updateToken(this.auth.extractToken(googleUser)));

  @Effect()
  updateProfileAfterSigninSuccess$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNIN_SUCCESS)
    .map(toPayload)
    .map((googleUser: gapi.auth2.GoogleUser) =>
      this.userProfileActions.userProfileRecieved(googleUser.getBasicProfile()));

  @Effect()
  userSignout$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNOUT)
    .switchMap(() => this.auth.signOut())
    .map(() => new UserActions.UserSignoutSuccess());

  @Effect({ dispatch: false })
  userSignoutSuccess$ = this.actions$
    .ofType(UserProfileActions.USER_SIGNOUT_SUCCESS)
    .do(() => this.auth.disposeAutoSignIn());
}
