import { AppApi } from '../../core/api/app.api';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlaygroundProxy } from './playground.proxy';
import { AuthorizationFire } from '../../core/services/firebase';

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
      <button class="btn btn-info" (click)="log()">log</button>
    </nav>
    <section class="well">
      <h3>Auth State:</h3>
      <pre>{{ auth$ | async | json }}</pre>
    </section>
  </article>
  <ul>
    <li class="text" *ngFor="let item of items$ | async">
      {{item.name}}
    </li>
  </ul>
  `
})
export class PlaygroundComponent implements OnInit {
  items$: Observable<any[]>;
  auth$: Observable<any> = this.fb.auth;

  constructor(
    private playgroundProxy: PlaygroundProxy,
    private route: ActivatedRoute,
    public fb: AuthorizationFire,
    private appApi: AppApi
  ) { }

  ngOnInit() { }

  getItems() {
    // this.items$ = this.fb.getUsers();
  }

  log() {
    console.log(this.fb.accessToken);
  }

  signin() {
    this.appApi.signIn();
    // this.fb.signin();
  }

  signout() {
    this.appApi.signOut();
    // this.fb.signout();
  }

  get isSignedIn() {
    return this.fb.isSignedIn;
  }
}
