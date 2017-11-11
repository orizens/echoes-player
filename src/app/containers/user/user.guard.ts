import { AuthorizationFire } from '../../core/services/firebase';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Authorization } from '../../core/services';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthorizationFire,
    private authorization: Authorization,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('AuthGuard#canActivate called', { state });
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    // const isSignedIn = this.authorization.isSignIn();
    let isSignedIn = false;
    this.auth.isSignedIn.take(1).subscribe(si => isSignedIn = Object.keys(si).length > 0);
    if (isSignedIn) { return true; }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/user']);
    return false;
  }
}
