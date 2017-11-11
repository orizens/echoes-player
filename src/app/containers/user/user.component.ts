import { UserProxy } from './user.proxy';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserProfile } from '../../core/services';
import { EchoesState } from '../../core/store';
import { AppApi } from '../../core/api/app.api';


@Component({
  selector: 'app-user',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./user.scss'],
  template: `
  <article>
    <app-navbar
      [header]="'My Profile - My Playlists'"
      [headerIcon]="'heart'"
    ></app-navbar>
    <p *ngIf="!(isSignedIn$ | async)" class="well lead">
      To view your playlists in youtube, you need to sign in.
      <button class="btn btn-lg btn-primary"
        (click)="signInUser()">
        <i class="fa fa-google"></i> Sign In
      </button>
    </p>
    <router-outlet></router-outlet>
  </article>
  `
})
export class UserComponent implements OnInit {
  isSignedIn$ = this.userProxy.isSignedIn$;

  constructor(
    private userProxy: UserProxy,
    private appApi: AppApi
  ) { }

  ngOnInit() { }

  signInUser() {
    this.appApi.signIn();
  }
}
