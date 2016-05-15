import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgModel, NgClass, AsyncPipe } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { YoutubePlayerState } from '../core/store/youtube-player';

@Component({
	selector: 'youtube-player',
	template: require('./youtube-player.html'),
	directives: [NgModel, NgClass],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayer implements OnInit {
	@Input() player: YoutubePlayerState;
	title: Observable<string>;

	constructor(public playerService: YoutubePlayerService) {
	}

	ngOnInit(){
		// this.playerService.player$.subscribe((player) => this.player = player);
		this.title = this.playerService.player$.map(player => player.media.snippet.title );
	}

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