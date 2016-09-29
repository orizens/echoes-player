import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';

import { YoutubeApiService } from './youtube-api.service';
import { YoutubeVideosInfo } from './youtube-videos-info.service';

@Injectable()
export class UserProfile {
	isSearching: Boolean = false;
	public playlistInfo: YoutubeApiService;
	public playlists: YoutubeApiService;

	constructor(
		private http: Http,
		private zone: NgZone,
		private youtubeVideosInfo: YoutubeVideosInfo,
		) {
		this.playlistInfo = new YoutubeApiService({
			url: 'https://www.googleapis.com/youtube/v3/playlistItems',
			http: this.http,
			idKey: 'playlistId'
		});
		// TODO - extract to a Model / Reducer?
		// Reducer - because nextPageToken is changed
		// Model - new _config should be recreated easily with a new nextPageToken
		this.playlists = new YoutubeApiService({
			url: 'https://www.googleapis.com/youtube/v3/playlists',
			http: this.http,
			config: {
				mine: 'true',
				part: 'snippet,id,contentDetails'
			}
		});
	}

	setAccessToken(token: string) {
		// TODO - extract to a reducer
		return this.playlists.setToken(token);
	}

	getPlaylists (isNewPage: boolean) {
		const hasAccessToken = this.playlists.hasToken();
		if (!hasAccessToken) {
			return;
		}
		if (isNewPage) {
			this.playlists.resetPageToken();
		}
		// TODO - extract to a reducer or/and an @Effect - SEARCH_START, SEARCH_COMPLETED
		this.isSearching = true;
		return this.playlists.getList();
	}

	updatePageToken(pageToken: string) {
		this.playlists.config.set('pageToken', pageToken);
	}

	resetPageToken () {
		this.playlists.config.set('pageToken', '');
	}

	fetchPlaylistItems (playlistId: string) {
		const token = this.playlists.config.get('access_token');
		return this.playlistInfo
			.list(playlistId, token)
			.then(response => {
				const videoIds = response.items.map(video => video.snippet.resourceId.videoId).join(',');
				return this.youtubeVideosInfo.api.list(videoIds);
			});
	}

	isTokenValid (token) {
		const accessToken = this.playlists.config.get('access_token');
		// TODO - should check if the current accessToken is still valid - google api
		return accessToken === token;
	}
}
