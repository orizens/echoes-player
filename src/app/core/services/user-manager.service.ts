import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UserProfileActions } from '../store/user-manager';
import { YOUTUBE_API_KEY } from './constants';
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
	public playlistInfo: YoutubeApiService;

	constructor(
		private http: Http,
		private zone: NgZone,
		private store: Store<any>,
		private youtubeVideosInfo: YoutubeVideosInfo,
		private userProfileActions: UserProfileActions
		) {
		this.playlistInfo = new YoutubeApiService({
			url: 'https://www.googleapis.com/youtube/v3/playlistItems',
			http: this.http,
			idKey: 'playlistId'
		});
		// TODO - extract to a Model / Reducer?
		// Reducer - because nextPageToken is changed
		// Model - new _config should be recreated easily with a new nextPageToken
		this._config.set('part', 'snippet,id,contentDetails');
		this._config.set('key', YOUTUBE_API_KEY);
		this._config.set('mine', 'true');
		this._config.set('maxResults', '50');
		this._config.set('pageToken', '');
	}

	setAccessToken(token: string) {
		// TODO - extract to a reducer
		return this._config.set('access_token', token);
	}

	getPlaylists (isNewPage: boolean) {
		const accessToken = this._config.get('access_token');
		if (!accessToken || '' === accessToken) {
			return;
		}
		if (isNewPage) {
			this.resetPageToken();
		}
		// TODO - extract to a reducer
		this.isSearching = true;
		return this.http.get(this.url, { search: this._config })
			.map(response => response.json());

			// .then(fetchContentDetails)
			// .then(addDuration)
			// .then(finalize);
	}

	// DEPRECATED - invoked via an effect
	searchMore(pageToken?: string) {
		if (!this.isSearching && this.nextPageToken) {
			this._config.set('pageToken', this.nextPageToken);
			this.getPlaylists(false);
		}
	}

	updatePageToken(pageToken: string) {
		this._config.set('pageToken', pageToken);
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

	isTokenValid (token) {
		const accessToken = this._config.get('access_token');
		// TODO - should check if the current accessToken is still valid - google api
		return accessToken === token;
	}
}
