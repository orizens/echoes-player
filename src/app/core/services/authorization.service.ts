import { Subscription } from 'rxjs/Rx';
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';

import { Store } from '@ngrx/store';
import { UserProfileActions } from '../store/user-profile';
import { EchoesState } from '../store/';
import { CLIENT_ID } from './constants';
import { GapiLoader } from './gapi-loader.service';

@Injectable()
export class Authorization {
  private _googleAuth: GoogleAuthResponse;
  private _scope: string = 'profile email https://www.googleapis.com/auth/youtube';
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
      .do((googleAuth: GoogleAuthResponse) => this.saveGoogleAuth(googleAuth))
      .do((googleAuth: GoogleAuthResponse) => this.listenToGoogleAuthSignIn(googleAuth))
      .filter((googleAuth: GoogleAuthResponse) => this.isSignIn())
      .filter((googleAuth: GoogleAuthResponse) => this.hasAccessToken(googleAuth))
      .map((googleAuth: GoogleAuthResponse) => googleAuth.currentUser.get())
      .subscribe((googleUser: GoogleAuthCurrentUser) => {
        this.zone.run(() => this.handleSuccessLogin(googleUser));
      });
  }

  authorize() {
    const authOptions = {
      client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
      scope: this._scope
    };
    return Observable.fromPromise(window.gapi.auth2.init(authOptions));
  }

  private hasAccessToken (googleAuth: GoogleAuthResponse): boolean {
    return googleAuth && googleAuth.currentUser.get().getAuthResponse().hasOwnProperty('access_token');
  }

  private saveGoogleAuth (googleAuth: GoogleAuthResponse): GoogleAuthResponse {
    this._googleAuth = googleAuth;
    return googleAuth;
  }

  private listenToGoogleAuthSignIn (googleAuth: GoogleAuthResponse) {
    window.gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
      console.log('authState changed', authState);
    });
  }

  signIn() {
    const signOptions: GoogleAuthSignInOptions = { scope: this._scope };
    if (this._googleAuth) {
      Observable.fromPromise(this._googleAuth.signIn(signOptions))
        .subscribe(response => this.handleSuccessLogin(response), error => this.handleFailedLogin(error));
    }
  }

  handleSuccessLogin(googleUser: GoogleAuthCurrentUser) {
    const authResponse = googleUser.getAuthResponse();
    const token = authResponse.access_token;
    const profile = googleUser.getBasicProfile();
    const MILLISECOND = 1000;
    const expireTimeInMs = parseInt(authResponse.expires_in, 10) * MILLISECOND;
    this.store.dispatch(this.userProfileActions.updateToken(token));
    this.store.dispatch(this.userProfileActions.userProfileRecieved(profile));
    if (this.autoSignInTimer) {
      this.autoSignInTimer.unsubscribe();
    }
    this.autoSignInTimer = this.startTimerToNextAuth(expireTimeInMs);
  }

  startTimerToNextAuth(timeInMs: number): Subscription {
    return Observable.timer(timeInMs)
      .timeInterval()
      .switchMap(() => this.authorize())
        .do((googleAuth: GoogleAuthResponse) => this.saveGoogleAuth(googleAuth))
        .map((googleAuth: GoogleAuthResponse) => googleAuth.currentUser.get())
        .subscribe((googleUser: GoogleAuthCurrentUser) => {
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
    return Observable.fromPromise(this._googleAuth.signOut())
      .subscribe(response => {
        this.store.dispatch(this.userProfileActions.signOut());
      });
  }
}
