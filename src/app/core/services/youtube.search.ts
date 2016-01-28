import { Http, URLSearchParams, Response } from 'angular2/http';
import { YoutubeItems } from './youtube.search.mock';
import { Injectable } from 'angular2/core';
import YOUTUBE_API_KEY from './constants';

@Injectable()
export class YoutubeSearch {
	url: string = 'https://www.googleapis.com/youtube/v3/search';
	private _config: URLSearchParams = new URLSearchParams();
	private config = {
		params: {
			part: 'snippet,id',
			key: YOUTUBE_API_KEY,
			q: '', //localStorageService.get(Storage.QUERY),
			maxResults: 50,
			type: 'video',//types.VIDEO
			pageToken: ''
		}
	};

	constructor(private http: Http) {
		this._config.set('part', 'snippet,id');
		this._config.set('key', YOUTUBE_API_KEY);
		this._config.set('q', '');
		this._config.set('maxResults', '50');
		this._config.set('type', 'video');
		this._config.set('pageToken', '');
	}

	search(query: string, dontReset: Boolean){
		let config = new URLSearchParams();
		config.set('part', 'snippet,id');
		config.set('key', YOUTUBE_API_KEY);
		config.set('q', '');
		config.set('maxResults', '50');
		config.set('type', 'video');
		config.set('pageToken', '');
		// return YoutubeItems;
		// if (!dontReset) {
		// 	resetList();
		// }
		let isSearching = true;
		// if (query && query !== this.config.params.q) {
		// 	this.config.params.pageToken = '';
		// }
		// remove properties not relevant to playlist search
		// sanitize();
		// this.config.params.q = query || this.config.params.q;
		if (query && query.length) {
			config.set('q', query);
		}
		// localStorageService.set(Storage.QUERY, this.config.params.q);
		return this.http.get(this.url, { search: config })
			// .map((res: Response) => res.json())
			.toPromise()
			.then((response) => response.json());
			// .subscribe((response) => {
			// 	console.log('search response', response);
			// 	return response;
			// });

			// .then(fetchContentDetails)
			// .then(addDuration)
			// .then(finalize);
	}
}