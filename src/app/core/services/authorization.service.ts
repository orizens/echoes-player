import { from as fromPromise, Subscription, Observable, timer } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import {
  switchMap,
  map,
  filter,
  tap,
  timeInterval,
  retry,
  catchError
} from 'rxjs/operators';
import { environment } from '@env/environment';
import { GapiLoader } from './gapi-loader.service';

const extractAccessToken = (_googleAuth: gapi.auth2.GoogleAuth) => {
  return (
    _googleAuth && _googleAuth.currentUser.get().getAuthResponse().access_token
  );
};

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
    const token = {
      fromGoogle: extractAccessToken(this._googleAuth),
      fromApp: this._accessToken,
      equal: true
    };
    return token.fromGoogle;
  }

  constructor(private zone: NgZone, private gapiLoader: GapiLoader) {}

  loadAuth() {
    // attempt to SILENT authorize
    return this.gapiLoader.load('auth2').pipe(
      switchMap(() => this.authorize()),
      tap((googleAuth: gapi.auth2.GoogleAuth) => {
        this.saveGoogleAuth(googleAuth);
        this.listenToGoogleAuthSignIn(googleAuth);
      }),
      filter(
        (googleAuth: gapi.auth2.GoogleAuth) =>
          this.isSignIn() && this.hasAccessToken(googleAuth)
      ),
      map((googleAuth: gapi.auth2.GoogleAuth) => googleAuth.currentUser.get())
    );
  }

  authorize() {
    // if (this._googleAuth) {
    //   console.log('signedIn?', this._googleAuth.isSignedIn.get());
    // }
    const authOptions = {
      client_id: environment.youtube.CLIENT_ID,
      scope: this._scope
    };
    return window['gapi'].auth2.init(authOptions);
  }

  private hasAccessToken(googleAuth: gapi.auth2.GoogleAuth): boolean {
    return (
      googleAuth &&
      googleAuth.currentUser
        .get()
        .getAuthResponse()
        .hasOwnProperty('access_token')
    );
  }

  private saveGoogleAuth(
    googleAuth: gapi.auth2.GoogleAuth
  ): gapi.auth2.GoogleAuth {
    this._googleAuth = googleAuth;
    return googleAuth;
  }

  private listenToGoogleAuthSignIn(googleAuth: gapi.auth2.GoogleAuth) {
    window['gapi']['auth2'].getAuthInstance().isSignedIn.listen(authState => {
      console.log('authState changed', authState);
    });
  }

  signIn() {
    const signOptions: gapi.auth2.SigninOptions = { scope: this._scope };
    if (this._googleAuth) {
      return fromPromise(this._googleAuth.signIn(signOptions));
    }
    return new Observable(obs => obs.complete());
  }

  extractToken(googleUser: gapi.auth2.GoogleUser) {
    const authResponse = googleUser.getAuthResponse();
    return authResponse.access_token;
  }

  setAuthTimer(googleUser: gapi.auth2.GoogleUser) {
    const MILLISECOND = 1000;
    const expireTime = 60 * 5;
    const expireTimeInMs = expireTime * MILLISECOND;
    this.disposeAutoSignIn();
    this.autoSignInTimer = this.startTimerToNextAuth(expireTimeInMs);
  }

  startTimerToNextAuth(timeInMs: number): Subscription {
    return timer(timeInMs)
      .pipe(
        timeInterval(),
        switchMap(() => this.authorize()),
        tap((googleAuth: gapi.auth2.GoogleAuth) =>
          this.saveGoogleAuth(googleAuth)
        ),
        map((googleAuth: gapi.auth2.GoogleAuth) =>
          googleAuth.currentUser.get()
        ),
        retry(3),
        catchError(error => {
          window.location.reload();
          return error;
        })
      )
      .subscribe((googleUser: gapi.auth2.GoogleUser) => {
        this.zone.run(() => this.setAuthTimer(googleUser));
      });
  }

  handleFailedLogin(response) {
    console.error('FAILED TO LOGIN:', response);
    return new Observable(obs => {
      obs.error();
      obs.complete();
    });
  }

  isSignIn() {
    return this._googleAuth && this._googleAuth.isSignedIn.get();
  }

  signOut() {
    return this._googleAuth.signOut();
  }

  disposeAutoSignIn() {
    if (this.autoSignInTimer) {
      this.autoSignInTimer.unsubscribe();
    }
  }
}
