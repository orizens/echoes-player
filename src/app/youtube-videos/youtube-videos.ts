import { Component, EventEmitter, Input, Output } from 'angular2/core';
// import { NgClass } from 'angular2/common';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubeList } from '../core/components/youtube-list/youtube-list';



@Component({
	selector: 'youtube-videos',
	template: require('./youtube-videos.html'),
	// inputs: [
	// ],
	// outputs: [
	// ],
	directives: [ YoutubeList ],
	providers: [ YoutubeSearch ]
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
			.then(response => this.videos = response.items);
	}

	playSelectedVideo(media) {
		console.log('playing', media);
	}
}