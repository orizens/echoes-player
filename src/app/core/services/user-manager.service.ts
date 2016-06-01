import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Store } from '@ngrx/store';
import { ADD_PLAYLISTS, UPDATE_TOKEN } from '../store/user-manager';
import { YOUTUBE_API_KEY, CLIENT_ID} from './constants';
import { YoutubeApiService } from './youtube-api.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
// https://www.googleapis.com/youtube/v3/playlistItems
@Injectable()
export class UserManager {
	url: string = 'https://www.googleapis.com/youtube/v3/playlists';
	private _config: URLSearchParams = new URLSearchParams();
	isSearching: Boolean = false;
	items: Array<any> = [];
	private nextPageToken: string;
	private isAuthInitiated: boolean = false;
	private isSignedIn: boolean = false;
	private auth2: any;
	public playlistInfo: YoutubeApiService;
	public playlistItemsInfo: YoutubeApiService;

	constructor(
		private http: Http, 
		private zone: NgZone,
		private store: Store<any>,
		private youtubeVideosInfo: YoutubeVideosInfo
		) {
		this.playlistInfo = new YoutubeApiService({
			url: 'https://www.googleapis.com/youtube/v3/playlistItems',
			http: this.http,
			idKey: 'playlistId'
		});
		this._config.set('part', 'snippet,id,contentDetails');
		this._config.set('key', YOUTUBE_API_KEY);
		this._config.set('mine', 'true');
		this._config.set('maxResults', '50');
		this._config.set('pageToken', '');

		window['apiLoaded'] = () => { 
			window.gapi.load('auth2', () => {
				this.authAndSignIn();
		    });
		}
	}
	
	authAndSignIn() {
		let GoogleAuth = window.gapi && window.gapi.auth2  && window.gapi.auth2.getAuthInstance ? window.gapi.auth2.getAuthInstance() : false;
		if (!this.isAuthInitiated) {
			if (!GoogleAuth) {
		        this.auth2 = window.gapi.auth2.init({
		            client_id: `${CLIENT_ID}.apps.googleusercontent.com`
		        });
			}
		} 
		if (GoogleAuth) {
			this.auth2 = GoogleAuth;
		}
		this.attachSignIn();
	}

	attachSignIn() {
    const run = (fn) => (r) => this.zone.run(() => fn(r));
		if (this.auth2 && !this.isSignedIn && !this.isAuthInitiated) {
			this.isAuthInitiated = true;
			// Attach the click handler to the sign-in button
			this.auth2.attachClickHandler('signin-button', {}, run(this.onLoginSuccess.bind(this)), run(this.onLoginFailed.bind(this)));
		}
	}

	onLoginSuccess(response) {
		const token = response.hg.access_token;
		this.isSignedIn = true;
		this.playlistInfo.setToken(token);
		this._config.set('access_token', token);
		this.store.dispatch({ type: UPDATE_TOKEN, payload: token });
		this.getPlaylists();
	}

	onLoginFailed (response) {
		console.log('FAILED TO LOGIN:', response);
	}

	isSignIn () {
		return this.isSignedIn;
	}

	getPlaylists(){
		this.isSearching = true;
		return this.http.get(this.url, { search: this._config })
			.toPromise()
			.then(response => response.json())
			.then(response => {
				this.nextPageToken = response.nextPageToken;
				this.isSearching = false;
				this.store.dispatch({ type: ADD_PLAYLISTS, payload: response.items })
				return response;
			});

			// .then(fetchContentDetails)
			// .then(addDuration)
			// .then(finalize);
	}

	searchMore() {
		if (!this.isSearching && this.items.length) {
			this._config.set('pageToken', this.nextPageToken);
		}
	}

	resetPageToken () {
		this._config.set('pageToken', '');
	}

	fetchPlaylistItems (playlistId: string) {
		return this.playlistInfo
			.list(playlistId)
			.then(response => { 
				const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
				return this.youtubeVideosInfo.api.list(videoIds);
			});
	}
}