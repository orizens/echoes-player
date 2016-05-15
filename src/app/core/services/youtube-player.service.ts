import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PLAY, QUEUE, TOGGLE_PLAYER, STATE_CHANGE } from '../store/youtube-player';

@Injectable()
export class YoutubePlayerService {
	public player: YT.Player;
	public player$: Observable<any>;

	constructor (public store: Store<any>) {
		window['onYouTubeIframeAPIReady'] = () => {
			this.player = this.createPlayer(() => { });
		}
		this.player$ = this.store.select('player');
	}
	play () {
		this.player.playVideo();
	}

	pause () {
		this.player.pauseVideo();
	}

	playVideo(media: GoogleApiYouTubeSearchResource) {
		this.player.loadVideoById(media.id.videoId);
		this.play();
		this.store.dispatch({ type: PLAY, payload: media });
	}

	togglePlayer() {
		this.store.dispatch({ type: TOGGLE_PLAYER, payload: true });
	}

	isPlaying () {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        const isPlayerReady: any = this.player && this.player.getPlayerState;
        const isPlayerPlaying = isPlayerReady ?
			this.player.getPlayerState() === YT.PlayerState.PLAYING :
			false;
        return isPlayerPlaying;
    }
	// createPlayer (elementId, height, width, videoId, callback) {
	createPlayer (callback) {
		const store = this.store;
		const defaultSizes = {
		    height: 270,
		    width: 300
		};
	    return new YT.Player('player', {
	        height: defaultSizes.height,
			width: defaultSizes.width,
	        videoId: '',
	        // playerVars: playerVars,
	        events: {
	            onReady: () => {},
				onStateChange: onPlayerStateChange
	        }
	    });

	    function onPlayerStateChange (event) {
	        const state = event.data;
			let autoNext = false;
	        // play the next song if its not the end of the playlist
	        // should add a "repeat" feature
	        // if (autoNext && state === YT.PlayerState.ENDED) {
	        //     service.playNextTrack({ stopOnLast: true });
	        // }

	        if (state === YT.PlayerState.PAUSED) {
	            // service.playerState = YT.PlayerState.PAUSED;
	        }
	        if (state === YT.PlayerState.PLAYING) {
	            // service.playerState = YT.PlayerState.PLAYING;
	        }
			store.dispatch({ type: STATE_CHANGE, payload: state });
	        // callback(state);
	        console.log('state changed', state);
	    }
	}
}