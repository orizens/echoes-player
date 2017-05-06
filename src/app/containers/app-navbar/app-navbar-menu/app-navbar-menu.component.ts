import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener } from '@angular/core';

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
  template: `
    <button class="btn btn-navbar btn-link ux-maker btn-toggle"
      (click)="toggleMenu()">
      <i class="fa fa-ellipsis-v"></i>
      <i *ngIf="appVersion.isNewAvailable" class="pulse update-indicator fa fa-dot-circle-o text-success"></i>
    </button>
    <div class="panel panel-default menu-dropdown"
      [class.slideInDown]="!hide"
      >
      <div class="menu-backdrop" *ngIf="!hide" (click)="hideMenu()"></div>
      <div class="list-group">
        <div *ngIf="appVersion.isNewAvailable" class="list-group-item">
          <button class="btn btn-success" title="click to update Echoes"
            (click)="handleVersionUpdate()">
            New Version Is Available - UPDATE AVAILABLE
          </button>
        </div>
        <a class="list-group-item" href="http://github.com/orizens/echoes-player" target="_blank">
          <i class="fa fa-github"></i> Source Code @Github
        </a>
        <a class="list-group-item" *ngIf="!hide" href="https://travis-ci.org/orizens/echoes-player" target="_blank">
          <img src="https://travis-ci.org/orizens/echoes-player.svg?branch=master">
        </a>
        <div class="list-group-item" target="_blank">
          v.<a href="https://github.com/orizens/echoes-player/blob/master/CHANGELOG.md" target="_blank">
            {{ appVersion.semver }} 
            </a>
          <button *ngIf="!appVersion.isNewAvailable"
            class="btn btn-info" (click)="handleVersionCheck()">
            Check For Updates
          </button>
          <div *ngIf="appVersion.checkingForVersion" class="text-info">
            checking for version...
          </div>
        </div>
        <a class="list-group-item" href="http://orizens.com" target="_blank">
          Made with <i class="fa fa-heart text-danger"></i> By Orizens
        </a>
        <button class="list-group-item"
          *ngIf="signedIn"
          (click)="handleSignOut()">
          <i class="fa fa-sign-out"></i> Sign Out
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./app-navbar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarMenuComponent implements OnInit {
  hide = true;
  @Input() signedIn = false;
  @Input() appVersion = {
    semver: '',
    isNewAvailable: false,
    checkingForVersion: false
  };
  @Output() signOut = new EventEmitter();
  @Output() versionUpdate = new EventEmitter();
  @Output() versionCheck = new EventEmitter();

  @HostListener('keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideMenu();
    }
  }

  constructor() { }

  ngOnInit() {}

  handleSignOut() {
    this.signOut.emit();
  }

  hideMenu() {
    this.hide = true;
  }

  toggleMenu() {
    this.hide = !this.hide;
  }

  handleVersionUpdate() {
    this.versionUpdate.emit();
  }

  handleVersionCheck() {
    this.versionCheck.emit();
  }
}
