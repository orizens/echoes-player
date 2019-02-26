import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

import { Authorization } from '@core/services';
import { EchoesState } from '@core/store';
import { AppApi } from '@api/app.api';

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
              <icon [name]="mainIcon"></icon>
            </button>
            <icon [name]="headerIcon" *ngIf="headerIcon"></icon> {{ header }}
          </h3>
          <ng-content></ng-content>
        </div>
        <section class="navbar-text navbar-actions">
          <app-navbar-user
            [signedIn]="isSignIn()"
            [userImageUrl]="(user$ | async).profile.imageUrl"
            (signIn)="signInUser()"
            ></app-navbar-user>
          <app-navbar-menu
            [appVersion]="appVersion$ | async"
            [theme]="themes$ | async"
            (themeChange)="changeTheme($event)"
            [signedIn]="isSignIn()"
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
  user$ = this.appApi.user$;
  appVersion$ = this.appApi.appVersion$;
  themes$ = this.appApi.themes$;

  @Input() header: string;
  @Input() headerIcon = '';
  @Input() mainIcon = '';

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() headerMainIconClick = new EventEmitter();

  constructor(private authorization: Authorization, private appApi: AppApi) {}

  ngOnInit() {}

  signInUser() {
    this.appApi.signinUser();
    this.signIn.next();
  }

  signOutUser() {
    this.appApi.signoutUser();
    this.signOut.next();
  }

  isSignIn() {
    return this.authorization.isSignIn();
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

  changeTheme(theme) {
    this.appApi.changeTheme(theme.value);
  }
}
