import { Component, EventEmitter, Input, Output } from 'angular2/core';
// import { NgClass } from 'angular2/common';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubeList } from '../core/components/youtube-list/youtube-list';

@Component({
	selector: 'youtube-videos',
	template: require('./youtube-videos.html'),
	directives: [ YoutubeList ],
	providers: [  ]
})
export class YoutubeVideos {
	// @Input() media: any;
	// @Output() play = new EventEmitter();
	videos: Array<any>;

	constructor(private youtubeSearch: YoutubeSearch) {
		this.search();
	}

	ngOnInit(){

	}

	search () {
		this.youtubeSearch.search('tremonti', true)
			.then(response => this.videos = this.youtubeSearch.items);
	}

	playSelectedVideo(media) {
		console.log('playing', media);
	}
}