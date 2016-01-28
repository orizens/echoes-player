import { Component, EventEmitter, Input, Output } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { YoutubeMedia } from '../youtube-media/youtube-media';

@Component({
	selector: 'youtube-list',
	template: require('./youtube-list.html'),
	inputs: [
		'list'
	],
	outputs: [
		// 'play'
		// 'queue',
		// 'add'
	],
	directives: [NgFor, YoutubeMedia ]
})
export class YoutubeList {
	// @Input() list: any = [];
	@Output() play = new EventEmitter();
	// @Output() queue = new EventEmitter();
	// @Output() add = new EventEmitter();

	constructor () {

	}

	ngOnInit(){

	}

	playSelectedVideo (media) {
		this.play.next(media);
	}

	queueSelectedVideo (media) {

	}

	addVideo (media) {

	}
}