import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

const Collections = {
  USERS: 'users'
};

@Injectable()
export class FirebaseStoreService {
  private usersCollection: AngularFirestoreCollection<any>;
  public users$: Observable<any>;
  public user$: Observable<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    // this.connectUsers();
  }

  connectUsers() {
    this.usersCollection = this.afs.collection(Collections.USERS);
    this.users$ = this.usersCollection.valueChanges();
  }

  addUser(user) {
    return this.afs.doc(`${Collections.USERS}/${user.uid}`).set(user);
  }

  getUser(user) {
    this.user$ = this.afs.doc(`${Collections.USERS}/${user.uid}`).valueChanges();
  }
}
