import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserProfile, Authorization } from '../../core/services';

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
  // playlists$ = this.store.let(getUserPlaylists$);
  // currentPlaylist$ = this.store.let(getUserViewPlaylist$);
  // isSignedIn$ = this.store.let(getIsUserSignedIn$);
  isSignedIn$ = this.userProfile.userProfile$.map(user => user.access_token !== '');

  constructor(
    private authorization: Authorization,
    public userProfile: UserProfile,
  ) {}

  ngOnInit () {}

  signInUser () {
    this.authorization.signIn();
  }

  // getPlaylists () {
  //   return this.youtubeApiService.getPlaylists2(true);
  // }
}
