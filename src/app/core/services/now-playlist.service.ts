import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { 
	SELECT, QUEUE, REMOVE, 
	UPDATE_INDEX, 
	FILTER_CHANGE, 
	REMOVE_ALL, 
	SELECT_NEXT, 
	QUEUE_VIDEOS, 
	YoutubeMediaPlaylist 
} from '../store/now-playlist';

@Injectable()
export class NowPlaylistService {
	public playlist$: Observable<Object>;

	constructor(public store: Store<YoutubeMediaPlaylist>) {
		this.playlist$ = this.store.select('nowPlaylist');
	}

	queueVideo (media) {
		this.store.dispatch({ type: QUEUE, payload: media });
	}

	queueVideos (medias) {
		this.store.dispatch({ type: QUEUE_VIDEOS, payload: medias });
	}

	removeVideo (media) {
		this.store.dispatch({ type: REMOVE, payload: media });
	}

	selectVideo (media) {
		this.store.dispatch({ type: SELECT, payload: media });
	}

	updateFilter (filter: string) {
		this.store.dispatch({ type: FILTER_CHANGE, payload: filter });
	}

	clearPlaylist () {
		this.store.dispatch({ type: REMOVE_ALL });
	}

	getNextVideoByIndex () {
		this.store.dispatch({ type: SELECT_NEXT })		
	}

	updateIndexByMedia(media: GoogleApiYouTubeSearchResource) {
		this.store.dispatch({ type: UPDATE_INDEX, payload: media });
	}
}