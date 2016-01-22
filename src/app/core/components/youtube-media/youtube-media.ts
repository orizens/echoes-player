import { Component, EventEmitter, Input, Output } from 'angular2/core';
import { NgClass } from 'angular2/common';

/* @ngInject */
@Component({
	selector: 'youtube-media',
	template: require('./youtube-media.html'),
	inputs: [
		'media'
	],
	// outputs: [
	// 	'play',
	// 	'queue',
	// 	'add'
	// ],
	directives: [ NgClass ]
})
export class YoutubeMedia {
	@Input() media: any;
	@Output() play = new EventEmitter();
	@Output() queue = new EventEmitter();
	@Output() add = new EventEmitter();

	showDesc = false;
	isPlaying = false;

	constructor () {

	}

	ngOnInit(){
		this.media.statistics.likeCount = parseInt(this.media.statistics.likeCount);
		this.media.statistics.viewCount = parseInt(this.media.statistics.viewCount);
	}

    playVideo (media) {
    	this.play.next(media);
	}

	queueVideo(media) {
		this.queue.next(media);
	}

	addVideo (media) {
		this.add.next(media);
	}

	toggle (showDesc) {
		this.showDesc = !showDesc;
	}
}
