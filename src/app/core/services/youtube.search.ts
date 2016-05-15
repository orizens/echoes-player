import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD, RESET } from '../store/youtube-videos';
import YOUTUBE_API_KEY from './constants';

@Injectable()
export class YoutubeSearch {
	url: string = 'https://www.googleapis.com/youtube/v3/search';
	private _config: URLSearchParams = new URLSearchParams();
	isSearching: Boolean = false;
	items: Array<any> = [];
	private nextPageToken: string;

	constructor(private http: Http, private store: Store<any>) {
		this._config.set('part', 'snippet,id');
		this._config.set('key', YOUTUBE_API_KEY);
		this._config.set('q', '');
		this._config.set('maxResults', '50');
		this._config.set('type', 'video');
		this._config.set('pageToken', '');
	}

	search(query: string, dontReset: Boolean){
		const isNewSearch = query && query !== this._config.get('q');
		const shouldBeReset = !dontReset;

		if (shouldBeReset || isNewSearch) {
			this.resetPageToken();
		}
		this.isSearching = true;
		if (query && query.length) {
			this._config.set('q', query);
		}
		// localStorageService.set(Storage.QUERY, this.config.params.q);
		return this.http.get(this.url, { search: this._config })
			// .map((res: Response) => res.json())
			.toPromise()
			.then((response) => response.json())
			.then((response) => {
				let itemsAmount = this.items.length;
				this.nextPageToken = response.nextPageToken;
				this.isSearching = false;
				this.items.splice(itemsAmount, 0, ...response.items);
				this.store.dispatch({ type: ADD, payload: [ ...response.items ] })
				return response;
			});

			// .then(fetchContentDetails)
			// .then(addDuration)
			// .then(finalize);
	}

	searchMore() {
		if (!this.isSearching && this.items.length) {
			this._config.set('pageToken', this.nextPageToken);
			this.search(this._config.get('q'), true);
		}
	}

	resetPageToken () {
		this._config.set('pageToken', '');
		this.store.dispatch({ type: RESET });
	}
}