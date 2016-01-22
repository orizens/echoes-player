import { Component, EventEmitter, Input } from 'angular2/core';
import { NgClass } from 'angular2/common';

/* @ngInject */
@Component({
	selector: 'youtube-media',
	template: require('./youtube.media.tpl.html'),
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
	playEvent = new EventEmitter();
	queueEvent = new EventEmitter();
	addEvent = new EventEmitter();

	showDesc = false;
	isPlaying = false;

	constructor () {

	}

	ngOnInit(){
		this.video.statistics.likeCount = parseInt(this.video.statistics.likeCount);
		this.video.statistics.viewCount = parseInt(this.video.statistics.viewCount);
	}

    playVideo (video) {
    	this.playEvent.next({ video });
	}

	queueVideo(video) {
		this.queueEvent.next({ video });
	}

	add (video) {
		this.addEvent.next({ video });
	}

	toggle (showDesc) {
		this.showDesc = !showDesc;
	}
}
