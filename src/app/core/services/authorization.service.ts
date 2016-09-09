import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { UPDATE_TOKEN } from '../store/user-manager';
import { CLIENT_ID} from './constants';
import { GapiLoader } from "./gapi-loader.service";

@Injectable()
export class Authorization {
	private isSignedIn: boolean = false;
	private auth2: any;
	private _googleAuth: any;

	constructor(
		private zone: NgZone,
		private store: Store<any>,
		private gapiLoader: GapiLoader
		) {
		this.loadAuth();
	}

	loadAuth () {
		// attempt to SILENT authorize
		this.gapiLoader
			.load('auth2')
			.subscribe(authInstance => {
				if (authInstance && authInstance.currentUser) {
					return this._googleAuth = authInstance;
				}
				this.authorize();
			});
	}

	authorize () {
		const authOptions = {
			client_id: `${CLIENT_ID}.apps.googleusercontent.com`
		};
		return window.gapi.auth2.init(authOptions)
			.then(GoogleAuth => this._googleAuth = GoogleAuth);
	}

	signIn () {
		const run = (fn) => (r) => this.zone.run(() => fn.call(this, r));
		const signOptions = { scope: 'profile email' };
		if (this._googleAuth) {
			this._googleAuth
				.signIn(signOptions)
				.then(
					run(this.onLoginSuccess),
					run(this.onLoginFailed)
				);
		}
	}

	onLoginSuccess(response) {
		const token = response.getAuthResponse().access_token;
		this.isSignedIn = true;
		this.store.dispatch({ type: UPDATE_TOKEN, payload: token });
	}

	onLoginFailed (response) {
		console.log('FAILED TO LOGIN:', response);
	}

	isSignIn () {
		return this.isSignedIn;
	}
}
