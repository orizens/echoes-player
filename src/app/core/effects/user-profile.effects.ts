import { AuthorizationFire } from '../services/firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { UserProfileActions } from '../store/user-profile';
import * as UserActions from '../store/user-profile';

import { UserProfile } from '../services/user-profile.service';
import { Authorization } from '../services/authorization.service';

import { AppApi } from '../../core/api/app.api';
import * as firebase from 'firebase/app';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private userProfileActions: UserProfileActions,
    private userProfile: UserProfile,
    private auth: Authorization,

    private fb: AuthorizationFire,
    private appApi: AppApi
  ) { }

  @Effect()
  updateToken$ = this.actions$
    .ofType(UserProfileActions.UPDATE_TOKEN)
    .map(toPayload)
    .map((token: string) => (this.auth.accessToken = token))
    .switchMap(token => {
      debugger;
      return this.userProfile.getPlaylists(true).catch((error: Error) => {
        console.log(`error in fetching user's playlists ${error}`);
        return of(error);
      });
    })
    .map(response => this.userProfileActions.updateData(response));

  @Effect()
  addUserPlaylists$ = this.actions$
    .ofType(UserProfileActions.UPDATE)
    .map(toPayload)
    .map((data: any) => this.userProfileActions.addPlaylists(data.items));

  // @Effect()
  // updateNextPageToken$ = this.actions$
  //   .ofType(UserProfileActions.UPDATE)
  //   .map(toPayload)
  //   .map(data => {
  //     const nextPageToken = data.nextPageToken;
  //     return nextPageToken
  //       ? this.userProfileActions.updatePageToken(data.nextPageToken)
  //       : this.userProfileActions.userProfileCompleted();
  //   });

  // @Effect()
  // getMorePlaylists$ = this.actions$
  //   .ofType(UserProfileActions.UPDATE_NEXT_PAGE_TOKEN)
  //   .map(toPayload)
  //   .switchMap((pageToken: string) => {
  //     this.userProfile.updatePageToken(pageToken);
  //     return this.userProfile.getPlaylists(false);
  //   })
  //   .map(response => this.userProfileActions.updateData(response));

  @Effect()
  startSignIn$ = this.actions$
    .ofType(UserProfileActions.SIGNIN)
    .switchMap(() => Observable.fromPromise(this.fb.signin()))
    .map((authResponse: firebase.auth.UserCredential) => new UserActions.SigninSuccess(authResponse))
    .catch((error) => of({ error }));

  @Effect()
  signinSuccessUpdateProfile$ = this.actions$
    .ofType(UserProfileActions.SIGNIN_SUCCESS)
    .map(toPayload)
    .map((authResponse) => new UserActions.ProfileRecieved(authResponse.user.toJSON()));

  @Effect()
  signinSuccessUpdateTokenInAuth$ = this.actions$
    .ofType(UserProfileActions.SIGNIN_SUCCESS)
    .map(toPayload)
    .do((authResponse: firebase.auth.UserCredential) => this.auth.accessToken = authResponse.credential['accessToken'])
    .map((authResponse: firebase.auth.UserCredential) => new UserActions.UpdateToken(authResponse.credential['accessToken']));
  // .switchMap((authResponse: firebase.auth.UserCredential) => Observable.fromPromise(authResponse.credential.providerId)
  // .do((token: string) => this.auth.accessToken = token);

  // @Effect()
  // signinSuccessUpdateUserToken$ = this.actions$
  //   .ofType(UserProfileActions.SIGNIN_SUCCESS)
  //   .map(toPayload)
  //   .map((authResponse) => {
  //     debugger;
  //     return new UserActions.UpdateToken(authResponse.user);
  //   });

  @Effect()
  signOut$ = this.actions$
    .ofType(UserProfileActions.SIGNOUT)
    .switchMap(() => this.fb.signout())
    .map(() => new UserActions.SignoutCompleted());
}
