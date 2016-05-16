import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { YOUTUBE_API_KEY, CLIENT_ID} from './constants';

export class YoutubeApiService {
	url: string;
	http: Http;
	idKey: string;
	private _config: URLSearchParams = new URLSearchParams();
	isSearching: Boolean = false;
	items: Array<any> = [];
	private nextPageToken: string;

	constructor(options: any) {
		if (options) {
			this.url = options.url;
			this.http = options.http;
			this.idKey = options.idKey;
		}
		this.config();
	}

	setToken(token: string) {
		this._config.set('access_token', token);
	}

	config() {
		this._config.set('part', 'snippet,contentDetails');
		this._config.set('key', YOUTUBE_API_KEY);
		this._config.set('maxResults', '50');
		this._config.set('pageToken', '');
	}

	list(id){
		this._config.set(this.idKey, id);
		this.isSearching = true;
		return this.http.get(this.url, { search: this._config })
			.toPromise()
			.then(response => response.json())
			.then(response => {
				this.nextPageToken = response.nextPageToken;
				this.isSearching = false;
				return response;
			});
	}

	searchMore() {
		if (!this.isSearching && this.items.length) {
			this._config.set('pageToken', this.nextPageToken);
		}
	}

	resetPageToken () {
		this._config.set('pageToken', '');
	}
}