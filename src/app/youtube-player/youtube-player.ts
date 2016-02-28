import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from 'angular2/core';
import { NgModel, NgClass, AsyncPipe } from 'angular2/common'
import { Observable } from 'rxjs/Observable';
import { YoutubePlayerService } from '../core/services/youtube-player.service';

@Component({
	selector: 'youtube-player',
	template: require('./youtube-player.html'),
	directives: [NgModel, NgClass]
})
export class YoutubePlayer {
	player: any;

	constructor(public playerService: YoutubePlayerService) {
		playerService.player$.subscribe((player) => this.player = player);
	}

	ngOnInit(){}

	playVideo () {
		this.playerService.play();
	}

	isPlaying () {
		return this.playerService.isPlaying();
	}

	pauseVideo () {
		this.playerService.pause();
	}

	togglePlayer () {
		this.playerService.togglePlayer();
	}
}