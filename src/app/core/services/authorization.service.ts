import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { Store } from '@ngrx/store';
import { UserProfileActions } from '../store/user-profile';
import { EchoesState } from '../store/';
import { CLIENT_ID } from './constants';
import { GapiLoader } from './gapi-loader.service';

@Injectable()
export class Authorization {
  private isSignedIn: boolean = false;
  private _googleAuth: any;
  private _scope: string = 'profile email https://www.googleapis.com/auth/youtube';

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
      .subscribe((authInstance: any) => {
        // gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
        // 	console.log('authState changed', authState);
        // });
        if (authInstance && authInstance.currentUser) {
          return this._googleAuth = authInstance;
        }
        this.authorize()
          .subscribe((googleAuth: any) => {
            window.gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
              console.log('authState changed', authState);
            });
            const isSignedIn = googleAuth.isSignedIn.get();
            const authResponse = googleAuth.currentUser.get();
            const hasAccessToken = authResponse.getAuthResponse().hasOwnProperty('access_token');
            this._googleAuth = googleAuth;
            if (isSignedIn && hasAccessToken) {
              this.zone.run(() => this.handleSuccessLogin(authResponse));
            }
          });
      });
  }

  authorize() {
    const authOptions = {
      client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
      scope: this._scope
    };
    return Observable.fromPromise(window.gapi.auth2.init(authOptions));
  }

  signIn() {
    const run = (fn) => (r) => this.zone.run(() => fn.call(this, r));
    const signOptions = { scope: this._scope };
    if (this._googleAuth) {
      Observable.fromPromise(this._googleAuth.signIn(signOptions))
        .subscribe(response => this.handleSuccessLogin(response), error => this.handleFailedLogin(error));
    }
  }

  handleSuccessLogin(response) {
    const token = response.getAuthResponse().access_token;
    const profile = response.getBasicProfile();
    this.isSignedIn = true;
    this.store.dispatch(this.userProfileActions.updateToken(token));
    this.store.dispatch(this.userProfileActions.userProfileRecieved(profile));
  }

  handleFailedLogin(response) {
    console.log('FAILED TO LOGIN:', response);
  }

  isSignIn() {
    return this.isSignedIn;
  }

  signOut () {
    return Observable.fromPromise(this._googleAuth.signOut())
      .subscribe(response => {
        this.isSignedIn = false;
        this.store.dispatch(this.userProfileActions.signOut());
      });
  }
}
