import { Subscription } from 'rxjs/Subscription';
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
// import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/retry';

import { Store } from '@ngrx/store';
import { UserProfileActions } from '../store/user-profile';
import { EchoesState } from '../store/';
import { CLIENT_ID } from './constants';
import { GapiLoader } from './gapi-loader.service';

@Injectable()
export class Authorization {
  private _googleAuth: gapi.auth2.GoogleAuth;
  private _scope = 'profile email https://www.googleapis.com/auth/youtube';
  private _accessToken: string;
  private autoSignInTimer: Subscription;

  set accessToken(value) {
    this._accessToken = value;
  }
  get accessToken() {
    return this._accessToken;
  }

  constructor(
    private zone: NgZone,
    private store: Store<EchoesState>,
    private gapiLoader: GapiLoader,
    private userProfileActions: UserProfileActions,
    public http: Http
  ) {
    this.loadAuth();
  }

  loadAuth() {
    // attempt to SILENT authorize
    this.gapiLoader
      .load('auth2')
      .switchMap(() => this.authorize())
      .do((googleAuth: gapi.auth2.GoogleAuth) => this.saveGoogleAuth(googleAuth))
      .do((googleAuth: gapi.auth2.GoogleAuth) => this.listenToGoogleAuthSignIn(googleAuth))
      .filter((googleAuth: gapi.auth2.GoogleAuth) => this.isSignIn())
      .filter((googleAuth: gapi.auth2.GoogleAuth) => this.hasAccessToken(googleAuth))
      .map((googleAuth: gapi.auth2.GoogleAuth) => googleAuth.currentUser.get())
      .subscribe((googleUser: gapi.auth2.GoogleUser) => {
        this.zone.run(() => this.handleSuccessLogin(googleUser));
      });
  }

  authorize() {
    if (this._googleAuth) {
      console.log('signedIn?', this._googleAuth.isSignedIn.get());
    }
    const authOptions = {
      client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
      scope: this._scope
    };
    return Observable.fromPromise(window['gapi'].auth2.init(authOptions));
  }

  private hasAccessToken (googleAuth: gapi.auth2.GoogleAuth): boolean {
    return googleAuth && googleAuth.currentUser.get().getAuthResponse().hasOwnProperty('access_token');
  }

  private saveGoogleAuth (googleAuth: gapi.auth2.GoogleAuth): gapi.auth2.GoogleAuth {
    this._googleAuth = googleAuth;
    return googleAuth;
  }

  private listenToGoogleAuthSignIn (googleAuth: gapi.auth2.GoogleAuth) {
    window['gapi']['auth2'].getAuthInstance().isSignedIn.listen(authState => {
      console.log('authState changed', authState);
    });
  }

  signIn() {
    const signOptions: gapi.auth2.SigninOptions = { scope: this._scope };
    if (this._googleAuth) {
      Observable.fromPromise(this._googleAuth.signIn(signOptions))
        .subscribe((response: any) => this.handleSuccessLogin(response), error => this.handleFailedLogin(error));
    }
  }

  handleSuccessLogin(googleUser: gapi.auth2.GoogleUser) {
    const authResponse = googleUser.getAuthResponse();
    const token = authResponse.access_token;
    const profile = googleUser.getBasicProfile();
    const MILLISECOND = 1000;
    const expireTime = 60 * 5;
    const expireTimeInMs = expireTime * MILLISECOND;
    this.store.dispatch(this.userProfileActions.updateToken(token));
    this.store.dispatch(this.userProfileActions.userProfileRecieved(profile));
    this.disposeAutoSignIn();
    this.autoSignInTimer = this.startTimerToNextAuth(expireTimeInMs);
  }

  startTimerToNextAuth(timeInMs: number): Subscription {
    return Observable.timer(timeInMs)
      .timeInterval()
      .switchMap(() => this.authorize())
        .do((googleAuth: gapi.auth2.GoogleAuth) => this.saveGoogleAuth(googleAuth))
        .map((googleAuth: gapi.auth2.GoogleAuth) => googleAuth.currentUser.get())
        .retry(3)
        .catch((error) => {
          window.location.reload();
          return error;
        })
        .subscribe((googleUser: gapi.auth2.GoogleUser) => {
          this.zone.run(() => this.handleSuccessLogin(googleUser));
        });
  }

  handleFailedLogin(response) {
    console.log('FAILED TO LOGIN:', response);
  }

  isSignIn() {
    return this._googleAuth && this._googleAuth.isSignedIn.get();
  }

  signOut () {
    this.disposeAutoSignIn();
    return Observable.fromPromise(this._googleAuth.signOut())
      .subscribe(response => {
        this.store.dispatch(this.userProfileActions.signOut());
      });
  }

  private disposeAutoSignIn() {
    if (this.autoSignInTimer) {
      this.autoSignInTimer.unsubscribe();
    }
  }
}
