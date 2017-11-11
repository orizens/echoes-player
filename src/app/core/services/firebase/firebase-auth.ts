import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firestore';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const GoogleAuthScopes = ['profile', 'email', 'https://www.googleapis.com/auth/youtube'];
@Injectable()
export class AuthorizationFire {
  // users: Observable<any[]>;
  get auth() {
    return this.afAuth.authState;
  }

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  getUsers() {
    // return this.db.collection('users').valueChanges();
  }

  signin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    GoogleAuthScopes.forEach(scope => provider.addScope(scope));
    return this.afAuth.auth.signInWithPopup(provider);
  }

  signout() {
    return this.afAuth.auth.signOut();
  }

  get isSignedIn() {
    return this.auth;
  }

  get accessToken() {
    return firebase.auth().currentUser.getIdToken();
  }
}
