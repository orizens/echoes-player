import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Authorization } from '../../core/services';
import { UserProfile } from '../../core/services';
import { AppLayoutService } from '../../core/services/app-layout.service';
import { VersionCheckerService } from '../../core/services';

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
  // user$ = this.store.let(getUser$);
  user$ = this.userProfileService.userProfile$;

  // appVersion$ = this.store.let(getAppVersion$);
  appVersion$ = this.appLayoutService.appLayout$.map(a => a.version);

  // themes$ = this.store.select(getAppThemes);
  themes$ = this.appLayoutService.appLayout$.map(appLayout => {
    return {
      selected: appLayout.theme,
      themes: appLayout.themes.map(theme => ({ label: theme, value: theme }))
    };
  });

  @Input() header: string;
  @Input() headerIcon = '';
  @Input() mainIcon = '';

  @Output() signIn = new EventEmitter();
  @Output() signOut = new EventEmitter();
  @Output() headerMainIconClick = new EventEmitter();

  constructor(
    private authorization: Authorization,
    private userProfileService: UserProfile,
    private versionCheckerService: VersionCheckerService,
    private appLayoutService: AppLayoutService,
  ) { }

  ngOnInit() { }

  signInUser() {
    this.authorization.signIn();
    this.signIn.next();
  }

  signOutUser() {
    this.authorization.signOut();
    // this.authorization.signOut().subscribe(response => {
    //   // this.store.dispatch(this.userProfileActions.signOut());
    //   this.userProfileService.signOut();
    // });
    this.signOut.next();
  }

  isSignIn() {
    return this.authorization.isSignIn();
  }

  updateVersion() {
    // this.store.dispatch(new AppLayout.UpdateAppVersion());
    this.versionCheckerService.updateVersion();
  }

  checkVersion() {
    // this.store.dispatch(new AppLayout.CheckVersion());
    this.appLayoutService.checkVersion();
    this.versionCheckerService.updateVersion();
  }

  handleMainIconClick() {
    this.headerMainIconClick.emit();
  }

  changeTheme(theme) {
    // this.store.dispatch(new AppLayout.ThemeChange(theme.value));
    this.appLayoutService.changeTheme(theme.value);
  }
}
