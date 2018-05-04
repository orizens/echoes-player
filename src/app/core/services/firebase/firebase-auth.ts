import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const GoogleAuthScopes = ['profile', 'email', 'https://www.googleapis.com/auth/youtube'];
@Injectable()
export class AuthorizationFire {
  get auth() {
    return this.afAuth.authState;
  }

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  getAuth() {
    return firebase.auth().currentUser.providerData[0];
  }

  signin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    GoogleAuthScopes.forEach(scope => provider.addScope(scope));
    return this.afAuth.auth.signInWithPopup(provider);
  }

  signout() {
    return this.afAuth.auth.signOut();
  }

  silentLogin() {
    const auth = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        // this.store.dispatch(new fromAuth.LoadUserEnded(user.uid));
        // this.user$ = this.attachUserToSource(user);
        auth.unsubscribe();
      }
    });
  }

  get isSignedIn() {
    return this.auth;
  }

  get accessToken() {
    return firebase.auth().currentUser.getIdToken();
  }
}
