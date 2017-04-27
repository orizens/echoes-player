import { getAppVersion$ } from '../../core/store/app-layout';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { getUser$, getUserPlaylists$ } from '../../core/store/user-profile/user-profile.selectors';
import { UserProfile, Authorization } from '../../core/services';
import { AppLayoutActions } from '../../core/store/app-layout';
import { EchoesState } from '../../core/store';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app-navbar.scss' ],
  template: `
    <nav class="row navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <h2 class="navbar-brand">
          <button class="btn btn-navbar text-primary btn-link ux-maker pull-left sidebar-toggle"
            (click)="toggleSidebar()">
            <i class="fa fa-bars"></i>
          </button>
        </h2>
        <div class="navbar__content pull-left">
          <ng-content></ng-content>
        </div>
        <section class="pull-right navbar-text navbar-actions">
          <app-navbar-user 
            [signedIn]="isSignIn()" 
            [userImageUrl]="(user$ | async).profile.imageUrl"
            (signIn)="signInUser()"
            ></app-navbar-user>
          <app-navbar-menu 
            [appVersion]="appVersion$ | async"            
            [signedIn]="isSignIn()"
            (signOut)="signOutUser()"
            (versionUpdate)="updateVersion()"
            (versionCheck)="checkVersion()"
          ></app-navbar-menu>
        </section>
      </div>
    </nav>
  `
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent implements OnInit {

  user$ = this.store.let(getUser$);
  appVersion$ = this.store.let(getAppVersion$);

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() menu = new EventEmitter();

  constructor(
    private authorization: Authorization,
    private appLayoutActions: AppLayoutActions,
    private userProfile: UserProfile,
    private store: Store<EchoesState>
  ) { }

  ngOnInit() {
  }

  signInUser () {
    this.authorization.signIn();
    this.signIn.next();
  }

  signOutUser () {
    this.authorization.signOut();
    this.signOut.next();
  }

  isSignIn () {
    return this.authorization.isSignIn();
  }

  toggleSidebar() {
    this.menu.next();
    return this.store.dispatch(this.appLayoutActions.toggleSidebar());
  }

  updateVersion() {
    this.store.dispatch(this.appLayoutActions.updateAppVersion());
  }

  checkVersion() {
    this.store.dispatch(this.appLayoutActions.checkVersion());
  }
}
