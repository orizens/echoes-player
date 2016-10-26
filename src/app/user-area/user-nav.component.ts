import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GoogleBasicProfile } from '../core/store/user-profile';

@Component({
  selector: 'user-nav',
  template: `
    <nav class="row navbar navbar-default">
      <div class="container-fluid">
        <h2 class="navbar-brand">
          <button class="btn btn-navbar text-primary btn-link ux-maker pull-left sidebar-toggle"
            (click)="toggleSidebar()">
            <i class="fa fa-bars"></i>
          </button>
          My Profile - <small>My Playlists</small>
        </h2>
        <section class="nav navbar-nav navbar-right navbar-text">
          <span class="btn btn-link navbar-link navbar-btn"
            *ngIf="isSignIn()"
            (click)="signOutUser()">
            <i class="fa fa-sign-out"></i>
            Sign Out
            <img [src]="profile.imageUrl" class="user-icon">
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNav implements OnInit {
  @Input() profile: GoogleBasicProfile = {};

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() menu = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  signInUser () {
    this.signIn.next();
  }

  signOutUser () {
    this.signOut.next();
  }

  isSignIn () {
    return this.profile.imageUrl && this.profile.imageUrl.length;
  }

  toggleSidebar () {
    this.menu.next();
  }
}
