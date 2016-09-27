import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { YoutubePlayerService } from '../core/services';
import { YoutubePlayerState } from '../core/store/youtube-player';

import './youtube-player.less';
import './media-info/media-info.less';
import './player-controls/player-controls.less';

@Component({
	selector: 'youtube-player',
	template: require('./youtube-player.html'),
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
		this.title = this.playerService.player$.map(player => player.media.snippet.title);
		this.playerService.registerListener('ended', this.onStop.bind(this));
		this.playerService.player$
			.take(1)
      .subscribe(player => player.isFullscreen = false);
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

	hasContent () {
		return Object.keys(this.player.media).length;
	}

	onThumbClick () {
		return true;
	}

	getMediaThumb () {
		const hasMedia = this.player && this.player.media.snippet.thumbnails;
		const mediaThumbUrl = hasMedia ? this.player.media.snippet.thumbnails.default.url : '';
		return mediaThumbUrl;
	}
}
