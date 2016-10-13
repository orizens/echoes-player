import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { YoutubePlayerService } from './youtube-player.service';

import './youtube-player.less';
import './media-info/media-info.less';
import './player-controls/player-controls.less';

@Component({
	selector: 'yt-player',
	template: `
		<div class="yt-player">
			<div id="yt-player-ng2-component"></div>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayer implements OnInit, AfterContentInit {
	@Input() videoId: string = '';

	@Output() init = new EventEmitter();
	@Output() change = new EventEmitter();

	constructor(
		public playerService: YoutubePlayerService,
		private elementRef: ElementRef
	) {
	}

	ngAfterContentInit () {
		this.playerService.loadPlayerApi();
		this.playerService.setupPlayer('yt-player-ng2-component');
	}

	ngOnInit (){
		// this.playerService.player$
		// 	.take(1)
    //   .subscribe(player => player.isFullscreen = false);
	}

	playVideo () {
		// this.playerService.play();
		// this.play.next(this.player.media);
	}

	isPlaying () {
		return this.playerService.isPlaying();
	}

	pauseVideo () {
		this.playerService.pause();
	}

	togglePlayer () {
		// this.playerService.togglePlayer();
	}

	playNextTrack () {
		// this.playNext.next(this.player);
	}

	onStop (state: YT.PlayerState) {
		// this.ended.next(state);
	}

	toggleFullScreen () {
		this.playerService.setSize();
	}

	hasContent () {
		// return Object.keys(this.player.media).length;
	}

	onThumbClick () {
		return true;
	}
}
