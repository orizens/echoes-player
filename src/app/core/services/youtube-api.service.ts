import { Http, URLSearchParams, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { YOUTUBE_API_KEY, CLIENT_ID} from './constants';
interface YoutubeApiServiceOptions {
	url: string,
	http: Http,
	idKey: string
}

export class YoutubeApiService {
	url: string;
	http: Http;
	idKey: string;
	isSearching: Boolean = false;
	items: Array<any> = [];
	config: URLSearchParams = new URLSearchParams();
	nextPageToken: string;

	constructor(options: YoutubeApiServiceOptions) {
		if (options) {
			this.url = options.url;
			this.http = options.http;
			this.idKey = options.idKey;
		}
		this.resetConfig();
	}

	setToken(token: string) {
		this.config.set('access_token', token);
	}

	resetConfig() {
		this.config.set('part', 'snippet,contentDetails');
		this.config.set('key', YOUTUBE_API_KEY);
		this.config.set('maxResults', '50');
		this.config.set('pageToken', '');
	}

	list(id, token?){
		this.config.set(this.idKey, id);
		this.isSearching = true;
		let options: RequestOptionsArgs = {
			search: this.config,
			headers: token ? new Headers({ Authorization: `Bearer ${token}` }) : new Headers()
		};
		return this.http.get(this.url, options)
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
			this.config.set('pageToken', this.nextPageToken);
		}
	}

	resetPageToken () {
		this.config.set('pageToken', '');
	}
}
