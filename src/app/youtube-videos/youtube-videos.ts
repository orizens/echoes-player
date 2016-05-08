import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgModel } from '@angular/common'
import { Store} from '@ngrx/store';
// import { NgClass } from '@angular/common';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { YoutubeList } from '../core/components/youtube-list/youtube-list';

@Component({
	selector: 'youtube-videos.youtube-videos',
	template: require('./youtube-videos.html'),
	directives: [YoutubeList, NgModel],
	providers: [  ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideos {
	// videos: Array<any>;
	videos: any;
	searchQuery: string = 'tremonti';

	constructor(
		private youtubeSearch: YoutubeSearch,
		private nowPlaylistService: NowPlaylistService,
		public store: Store<any>,
		public youtubePlayer: YoutubePlayerService) {
		this.videos = this.store.select('videos');
		this.search();
	}

	ngOnInit(){
	}

	search () {
		this.youtubeSearch.search(this.searchQuery, false);
			// .then(response => {
			// 	this.videos = this.youtubeSearch.items;
			// });
	}

	playSelectedVideo (media) {
		this.youtubePlayer.playVideo(media);
	}

	queueSelectedVideo (media) {
		this.nowPlaylistService.queueVideo(media);
	}

	resetPageToken() {
		this.youtubeSearch.resetPageToken();
	}
}