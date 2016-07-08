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
import { YoutubeVideosInfo } from './youtube-videos-info.service';


@Injectable()
export class NowPlaylistService {
	public playlist$: Observable<YoutubeMediaPlaylist>;

	constructor(public store: Store<any>,
		private youtubeVideosInfo: YoutubeVideosInfo
		) {
		this.playlist$ = this.store.select(state => state.nowPlaylist);
	}

	queueVideo (mediaId: string) {
		return this.youtubeVideosInfo.api.list(mediaId)
      .then(response => {
        this.store.dispatch({ type: QUEUE, payload: response.items[0] });
        return response.items[0];
			});
	}

	queueVideos (medias: GoogleApiYouTubeVideoResource[]) {
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

	selectNextIndex () {
		this.store.dispatch({ type: SELECT_NEXT })
	}

	getCurrent () {
		let media;
		this.playlist$.take(1).subscribe(playlist => media = playlist.videos[playlist.index]);
		return media;
	}

	updateIndexByMedia(media: GoogleApiYouTubeSearchResource) {
		this.store.dispatch({ type: UPDATE_INDEX, payload: media });
	}
}