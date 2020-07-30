import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  template: `
    <a class="btn btn-link navbar-link navbar-btn"
      *ngIf="signedIn; else userNotSignedIn"
      [routerLink]="['/user']">
      <img [src]="userImageUrl" class="user-icon">
    </a>
    <ng-template #userNotSignedIn>
      <button class="btn btn-link navbar-link navbar-btn is-flex-row is-flex-valign"
        title="Sign In With Your TouTube account"
        (click)="handleSignIn()">
        <span class="sign-in-text">Sign In</span>
        <div class="sign-in-with-youtube"></div>
    </button>
    </ng-template>
  `,
  styleUrls: ['./app-navbar-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarUserComponent {
  @Input() userImageUrl = '';
  @Input() signedIn = false;

  @Output() signIn = new EventEmitter();

  constructor() { }

  handleSignIn() {
    this.signIn.emit();
  }
}
