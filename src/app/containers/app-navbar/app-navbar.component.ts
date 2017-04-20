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
        <button type="button" class="navbar-toggle collapsed pull-right navbar-nav"
          (click)="toggleCollapse()">
          <i class="fa fa-angle-double-up" [class.fa-angle-double-down]="isCollapsed"></i>
        </button>
        <div class="navbar-collapse navbar-nav">
          <ng-content></ng-content>
        </div>
        <section class="nav navbar-nav navbar-right navbar-text navbar-actions"
          [class.collapsed]="isCollapsed">
          <app-navbar-user [signedIn]="isSignIn()" 
            [userImageUrl]="(user$ | async).profile.imageUrl"
            (signIn)="signInUser()"
            ></app-navbar-user>
          <app-navbar-menu [signedIn]="isSignIn()" (signOut)="signOutUser()"></app-navbar-menu>
        </section>
      </div>
    </nav>
  `
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent implements OnInit {

  user$ = this.store.let(getUser$);
  isCollapsed = true;

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
    this.user$ = this.store.select(state => state.user);
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

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
