import { AppApi } from '../../core/api/app.api';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlaygroundProxy } from './playground.proxy';
import { AuthorizationFire, FirebaseStoreService } from '../../core/services/firebase';

@Component({
  selector: 'playground',
  styleUrls: ['./playground.component.scss'],
  template: `
  <article class="col-md-12">
    <nav class="col-md-12">
      <button class="btn btn-primary" (click)="getItems()">
        get
      </button>
      <button *ngIf="!(isSignedIn | async)" class="btn btn-success" (click)="signin()">Login With Firebase</button>
      <button *ngIf="isSignedIn | async" class="btn btn-danger" (click)="signout()">Signout</button>
      <button *ngIf="isSignedIn | async" class="btn btn-info" (click)="connectStore()">Connect FireStore</button>
      <button *ngIf="isSignedIn | async" class="btn btn-info" (click)="addUser()">Save User</button>
      <button *ngIf="isSignedIn | async" class="btn btn-info" (click)="getUser()">Get Current User</button>
      <button class="btn btn-info" (click)="log()">log</button>
    </nav>
    <section class="well">
      <h3>Auth State:</h3>
      <pre>{{ auth$ | async | json }}</pre>
    </section>
  </article>
  <section class="well">
    <pre>{{ user$ | async | json }}</pre>
  </section>
  <ul>
    <li class="text" *ngFor="let item of items$ | async">
      {{ item | json }}
    </li>
  </ul>
  `
})
export class PlaygroundComponent implements OnInit {
  items$ = this.fs.users$;
  user$ = this.fs.user$;
  auth$: Observable<any> = this.fb.auth;

  constructor(
    private playgroundProxy: PlaygroundProxy,
    private route: ActivatedRoute,
    public fb: AuthorizationFire,
    public fs: FirebaseStoreService,
    private appApi: AppApi
  ) { }

  ngOnInit() { }

  getItems() {
    // this.items$ = this.fb.getUsers();
  }

  connectStore() {
    this.fs.connectUsers();
  }

  addUser() {
    const data = this.fb.getAuth();
    console.log(data);
    this.fs.addUser(data);
  }

  getUser() {
    const data = this.fb.getAuth();
    return this.fs.getUser(data);
  }

  log() {
    console.log(this.fb.accessToken);
  }

  signin() {
    this.appApi.signinUser();
    // this.fb.signin();
  }

  signout() {
    this.appApi.signoutUser();
    // this.fb.signout();
  }

  get isSignedIn() {
    return this.fb.isSignedIn;
  }
}
