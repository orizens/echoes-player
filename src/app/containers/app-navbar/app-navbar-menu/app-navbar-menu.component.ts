import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { expandFadeInAnimation } from '@shared/animations/fade-in.animation';
import { ICON_PREFIX_BRAND } from '@shared/directives/icon';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Escape = 27,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  ArrowDown = 40
}
@Component({
  selector: 'app-navbar-menu',
  animations: [expandFadeInAnimation],
  template: `
    <button class="btn btn-navbar btn-transparent ux-maker btn-toggle"
      (click)="toggleMenu()">
      <icon name="ellipsis-v"></icon>
      <icon *ngIf="appVersion.isNewAvailable" name="dot-circle-o" class="pulse update-indicator text-primary"></icon>
    </button>
    <div class="menu-backdrop" *ngIf="!hide" (click)="hideMenu()"></div>
    <div class="panel menu-dropdown"
      [class.end-animation]="end"
      [@expandFadeIn]="menuState"
      (@expandFadeIn.done)="endAnimation($event)"
      >
      <div class="list-group">
        <div *ngIf="appVersion.isNewAvailable" class="list-group-item">
          <button class="btn btn-success" title="click to update Echoes"
            (click)="handleVersionUpdate()">
            New Version Is Available - UPDATE NOW
          </button>
        </div>
        <a class="list-group-item" href="http://github.com/orizens/echoes-player" target="_blank">
        <icon name="github" prefix="${ICON_PREFIX_BRAND}"></icon> Source Code @Github
        </a>
        <a class="list-group-item" *ngIf="!hide" href="https://travis-ci.org/orizens/echoes-player" target="_blank" rel="noopener">
          <icon name="medkit"></icon> <img src="https://travis-ci.org/orizens/echoes-player.svg?branch=master">
        </a>
        <div class="list-group-item menu-version" target="_blank">
          <section>
            <icon name="code-fork"></icon>
            <a href="https://github.com/orizens/echoes-player/blob/master/CHANGELOG.md" target="_blank" rel="noopener">
              {{ appVersion.semver }}
            </a>
          </section>
          <button *ngIf="!appVersion.isNewAvailable"
          class="btn btn-info" (click)="handleVersionCheck()">
          Check For Updates
          </button>
          <div *ngIf="appVersion.checkingForVersion" class="text-info">
          checking for version...
          </div>
        </div>
        <div class="list-group-item">
          <icon name="paint-brush" class="text-primary"></icon> Theme: 
          <button-group [buttons]="theme.themes" [selectedButton]="theme.selected"
            (buttonClick)="updateTheme($event)"></button-group>
        </div>
        <a class="list-group-item" href="http://orizens.com" rel="noopener" blank="_target">
          <icon name="keyboard-o"></icon> Made with <icon name="heart-o" class="text-danger"></icon> By Orizens
        </a>
        <a class="list-group-item navbar-action-link" href="https://docs.google.com/forms/d/e/1FAIpQLSdzGRIXoHuzRFZU03EyhgwBJgJp6W1LMatz6Bn44L-5SyuxZA/viewform" target="_blank" rel="noopener">
          <icon name="star-o"></icon> Request New Features
        </a>
        <button class="list-group-item"
          *ngIf="signedIn"
          (click)="handleSignOut()">
          <icon name="sign-out"></icon> Sign Out
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./app-navbar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarMenuComponent implements OnInit {
  end = false;
  hide = true;
  get menuState() {
    return this.hide ? 'hide' : 'show';
  }

  @Input() signedIn = false;
  @Input()
  appVersion = {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  };
  @Input() theme = { themes: [], selected: '' };
  @Output() signOut = new EventEmitter();
  @Output() versionUpdate = new EventEmitter();
  @Output() versionCheck = new EventEmitter();
  @Output() themeChange = new EventEmitter();

  @HostListener('keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideMenu();
    }
  }

  constructor() {}

  ngOnInit() {}

  handleSignOut() {
    this.signOut.emit();
  }

  hideMenu() {
    this.hide = true;
  }

  toggleMenu() {
    this.end = false;
    this.hide = !this.hide;
  }

  handleVersionUpdate() {
    this.versionUpdate.emit();
  }

  handleVersionCheck() {
    this.versionCheck.emit();
  }

  updateTheme(theme) {
    this.themeChange.emit(theme);
  }

  endAnimation({ toState }) {
    if (toState === 'hide') {
      this.end = true;
    }
  }
}
