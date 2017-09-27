import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Authorization } from '../../core/services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authorization: Authorization, private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('AuthGuard#canActivate called', { state });
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  checkLogin (url: string): boolean {
    if (this.authorization.isSignIn()) { return true; }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/user']);
    return false;
  }
}
