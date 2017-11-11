import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

import { AppApi } from '../../core/api/app.api';
import { AuthorizationFire } from '../../core/services/firebase';
import { AppNavbarProxy } from './app-navbar.proxy';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app-navbar.scss'],
  template: `
    <nav class="row navbar navbar-default navbar-fixed-top">
      <div class="navbar-container">
        <div class="navbar__content">
        <h3 *ngIf="header" class="navbar__header navbar-text">
            <button *ngIf="mainIcon" class="navbar-btn__main btn-transparent"
              (click)="handleMainIconClick()">
              <i class="fa fa-{{ mainIcon }}"></i>
            </button>
            <i class="fa fa-{{ headerIcon }}" *ngIf="headerIcon"></i> {{ header }}
          </h3>
          <ng-content></ng-content>
        </div>
        <section class="navbar-text navbar-actions">
          <app-navbar-user
            [signedIn]="isSignedIn$ | async"
            [userImageUrl]="userPhoto$ | async"
            (signIn)="signInUser()"
            ></app-navbar-user>
          <app-navbar-menu
            [appVersion]="appVersion$ | async"
            [signedIn]="isSignedIn$ | async"
            (signOut)="signOutUser()"
            (versionUpdate)="updateVersion()"
            (versionCheck)="checkVersion()"
          ></app-navbar-menu>
        </section>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent implements OnInit {
  user$ = this.appnavbarProxy.user$;
  userPhoto$ = this.appnavbarProxy.userPhoto$;
  appVersion$ = this.appnavbarProxy.appVersion$;
  isSignedIn$ = this.appnavbarProxy.isSignedIn;

  @Input() header: string;
  @Input() headerIcon = '';
  @Input() mainIcon = '';

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() headerMainIconClick = new EventEmitter();

  constructor(
    private appApi: AppApi,
    private appnavbarProxy: AppNavbarProxy
  ) { }

  ngOnInit() { }

  signInUser() {
    this.appApi.signIn();
    this.signIn.next();
  }

  signOutUser() {
    this.appApi.signOut();
    this.signOut.next();
  }

  updateVersion() {
    this.appApi.updateVersion();
  }

  checkVersion() {
    this.appApi.checkVersion();
  }

  handleMainIconClick() {
    this.headerMainIconClick.emit();
  }
}
