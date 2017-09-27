import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserProfile, Authorization } from '../../core/services';
import { EchoesState } from '../../core/store';
import { getUserPlaylists$, getUserViewPlaylist$, getIsUserSignedIn$ } from '../../core/store/user-profile/user-profile.selectors';


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
  playlists$ = this.store.let(getUserPlaylists$);
  currentPlaylist$ = this.store.let(getUserViewPlaylist$);
  isSignedIn$ = this.store.let(getIsUserSignedIn$);

  constructor(
    private userProfile: UserProfile,
    private authorization: Authorization,
    public store: Store<EchoesState>
  ) {}

  ngOnInit () {}

  signInUser () {
    this.authorization.signIn();
  }

  getPlaylists () {
    return this.userProfile.getPlaylists(true);
  }
}
