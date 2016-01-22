import { Component, EventEmitter, Input, Output } from 'angular2/core';
import { NgClass } from 'angular2/common';

/* @ngInject */
@Component({
	selector: 'youtube-media',
	template: require('./youtube-media.html'),
	inputs: [
		'video'
	],
	// outputs: [
	// 	'play',
	// 	'queue',
	// 	'add'
	// ],
	directives: [ NgClass ]
	// pipes: [ NumberPipe ]
})
export class YoutubeMedia {
	@Input() video: any;
	@Output() play = new EventEmitter();
	@Output() queue = new EventEmitter();
	@Output() add = new EventEmitter();

	showDesc = false;
	isPlaying = false;

	constructor () {

	}

	ngOnInit(){
		this.video.statistics.likeCount = parseInt(this.video.statistics.likeCount);
		this.video.statistics.viewCount = parseInt(this.video.statistics.viewCount);
	}

    playVideo (video) {
    	this.play.next(video);
	}

	queueVideo(video) {
		this.queue.next({ video });
	}

	addVideo (video) {
		this.add.next({ video });
	}

	toggle (showDesc) {
		this.showDesc = !showDesc;
	}
}
