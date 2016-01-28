import { Component, EventEmitter, Input, Output } from 'angular2/core';
// import { NgClass } from 'angular2/common';
import { YoutubeList } from '../core/youtube-list/youtube-list';


@Component({
	selector: 'youtube-videos',
	template: require('./youtube-videos.html'),
	// inputs: [
	// ],
	// outputs: [
	// ],
	directives: [ YoutubeList ]
})
export class YoutubeVideos {
	// @Input() media: any;
	// @Output() play = new EventEmitter();
	mediaList: Array<any>;

	constructor () {

	}

	ngOnInit(){

	}
}