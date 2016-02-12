import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from 'angular2/core';
import { Store} from '@ngrx/store';
// import { NgClass } from 'angular2/common';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubeList } from '../core/components/youtube-list/youtube-list';

@Component({
	selector: 'youtube-videos',
	template: require('./youtube-videos.html'),
	directives: [ YoutubeList ],
	providers: [  ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideos {
	// videos: Array<any>;
	videos: any;

	constructor(private youtubeSearch: YoutubeSearch, public store: Store<any>) {
		this.videos = this.store.select('videos');
		this.search();
	}

	ngOnInit(){
	}

	search () {
		this.youtubeSearch.search('tremonti', true)
			// .then(response => {
			// 	this.videos = this.youtubeSearch.items;
			// });
	}

	playSelectedVideo(media) {
		console.log('playing', media);
	}
}