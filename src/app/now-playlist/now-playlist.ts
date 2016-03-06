import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from 'angular2/core';
import { NgClass, NgFor } from 'angular2/common';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { YoutubeMediaPlaylist } from '../core/store/now-playlist';
import { SearchPipe } from '../core/pipes/search.pipe';

@Component({
	selector: 'now-playlist',
	template: require('./now-playlist.html'),
	directives: [NgClass, NgFor],
	pipes: [SearchPipe],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylist {
	@Input() playlist: YoutubeMediaPlaylist;
	@Output() select = new EventEmitter();
	@Output() sort = new EventEmitter();

	constructor(private nowPlaylistService: NowPlaylistService) { }

	ngOnInit(){}

	selectVideo (media) {
		this.nowPlaylistService.selectVideo(media);
		this.select.next(media);
	}

	removeVideo (media: GoogleApiYouTubeSearchResource) {
		this.nowPlaylistService.removeVideo(media);
	}

	sortVideo (media) {
		this.sort.next(media);
	}
}