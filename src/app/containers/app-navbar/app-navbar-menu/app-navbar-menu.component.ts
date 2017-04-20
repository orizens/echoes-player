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
    <button class="btn btn-navbar btn-link ux-maker"
      (click)="toggleMenu()">
      <i class="fa fa-ellipsis-v"></i>
    </button>
    <div class="panel panel-default menu-dropdown"
      *ngIf="!hide">
      <div class="menu-backdrop" (click)="hideMenu()"></div>
      <div class="list-group">
        <a class="list-group-item" href="http://github.com/orizens/echoes-player" target="_blank">
          <i class="fa fa-github"></i> Source Code @Github
        </a>
        <a class="list-group-item" href="https://travis-ci.org/orizens/echoes-player" target="_blank">
          <img src="https://travis-ci.org/orizens/echoes-player.svg?branch=master">
          | version 0.3.2 
        </a>
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
  @Output() signOut = new EventEmitter();

  @HostListener('keyup', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideMenu();
    }
  }

  constructor() { }

  ngOnInit() {
  }

  handleSignOut() {
    this.signOut.emit();
  }

  hideMenu() {
    this.hide = true;
  }

  toggleMenu() {
    this.hide = !this.hide;
  }
}
