import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgModel, NgClass, AsyncPipe } from '@angular/common'
import { Observable } from 'rxjs/Observable';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { YoutubePlayerState } from '../core/store/youtube-player';

@Component({
	selector: 'youtube-player',
	template: require('./youtube-player.html'),
	directives: [NgModel, NgClass],
	styles: [
		`.navbar-brand {
			text-transform: lowercase;
			color: white;
		}`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayer implements OnInit {
	@Input() player: YoutubePlayerState;
	@Output() ended = new EventEmitter();
	@Output() playNext = new EventEmitter();
	@Output() play = new EventEmitter();

	title: Observable<string>;

	constructor(public playerService: YoutubePlayerService) {
	}

	ngOnInit(){
		// this.playerService.player$.subscribe((player) => this.player = player);
		this.title = this.playerService.player$.map(player => player.media.snippet.title );
		this.playerService.registerListener('ended', this.onStop.bind(this));
	}

	playVideo () {
		this.playerService.play();
		this.play.next(this.player.media);
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

	playNextTrack () {
		this.playNext.next(this.player);
	}

	onStop (state: YT.PlayerState) {
		this.ended.next(state);
	}

	toggleFullScreen () {
		this.playerService.setSize();
	}
}