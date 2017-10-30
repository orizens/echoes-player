import { getAppVersion$ } from '../../core/store/app-layout';
import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { getUser$, getUserPlaylists$ } from '../../core/store/user-profile/user-profile.selectors';
import { UserProfile, Authorization } from '../../core/services';
import * as AppLayout from '../../core/store/app-layout';
import { EchoesState } from '../../core/store';

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent implements OnInit {
  user$ = this.store.let(getUser$);
  appVersion$ = this.store.let(getAppVersion$);

  @Input() header: string;
  @Input() headerIcon = '';
  @Input() mainIcon = '';

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() headerMainIconClick = new EventEmitter();

  constructor(
    private authorization: Authorization,
    private userProfile: UserProfile,
    private store: Store<EchoesState>
  ) { }

  ngOnInit() { }

  signInUser() {
    this.authorization.signIn();
    this.signIn.next();
  }

  signOutUser() {
    this.authorization.signOut();
    this.signOut.next();
  }

  isSignIn() {
    return this.authorization.isSignIn();
  }

  updateVersion() {
    this.store.dispatch(new AppLayout.UpdateAppVersion());
  }

  checkVersion() {
    this.store.dispatch(new AppLayout.CheckVersion());
  }

  handleMainIconClick() {
    this.headerMainIconClick.emit();
  }
}
