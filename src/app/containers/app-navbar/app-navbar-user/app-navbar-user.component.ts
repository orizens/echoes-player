import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  template: `
    <span class="btn btn-link navbar-link navbar-btn"
      *ngIf="signedIn; else userNotSignedIn">
      <img [src]="userImageUrl" class="user-icon">
    </span>
    <ng-template #userNotSignedIn>
      <span class="btn btn-link navbar-link navbar-btn"
        (click)="handleSignIn()">
        <i class="fa fa-sign-in"></i>
        Sign In
      </span>
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
