import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { YoutubeMedia } from '../youtube-media/youtube-media';

@Component({
	selector: 'youtube-list',
	template: `
		<youtube-media
			*ngFor="let media of list"
			[media]="media"
			(play)="playSelectedVideo(media)"
			(queue)="queueSelectedVideo(media)"
			(add)="addVideo(media)">
		</youtube-media>
	`,
	directives: [NgFor, YoutubeMedia ]
})
export class YoutubeList {
	@Input() list: any;
	@Output() play = new EventEmitter();
	@Output() queue = new EventEmitter();
	@Output() add = new EventEmitter();

	constructor () {}

	playSelectedVideo (media) {
		this.play.next(media);
	}

	queueSelectedVideo (media) {
		this.queue.next(media);
	}

	addVideo (media) {
		this.add.next(media);
	}
}