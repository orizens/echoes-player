import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { user, UserProfileData, GoogleBasicProfile } from '../core/store/user-profile';
import { UserProfile, Authorization } from '../core/services';
import { AppLayoutActions } from '../core/store/app-layout';
import { EchoesState } from '../core/store';

import './app-navbar.less';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="row navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <h2 class="navbar-brand">
          <button class="btn btn-navbar text-primary btn-link ux-maker pull-left sidebar-toggle"
            (click)="toggleSidebar()">
            <i class="fa fa-bars"></i>
          </button>
          <ng-content></ng-content>
        </h2>
        <section class="nav navbar-nav navbar-right navbar-text">
          <span class="btn btn-link navbar-link navbar-btn"
            *ngIf="isSignIn()"
            (click)="signOutUser()">
            <i class="fa fa-sign-out"></i>
            Sign Out
            <img [src]="(user$ | async)?.profile.imageUrl" class="user-icon">
          </span>
          <span class="btn btn-link navbar-link navbar-btn"
            *ngIf="!isSignIn()"
            (click)="signInUser()">
            <i class="fa fa-sign-in"></i>
            Sign In
          </span>
        </section>
      </div>
    </nav>
  `
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbar implements OnInit {
  private user$: Observable<UserProfileData>;

  // @Input() profile: GoogleBasicProfile = {};

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
}
