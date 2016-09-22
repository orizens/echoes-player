import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YoutubeMediaPlaylist } from '../../core/store/now-playlist';

import './now-playlist.less';

@Component({
	selector: 'now-playlist',
	template: `
	<section class="now-playlist"
		[ngClass]="{
			'transition-in': playlist?.videos?.length
		}">
		<ul class="nav nav-list ux-maker nicer-ux">
			<li class="now-playlist-track"
				[ngClass]="{
					'active': playlist?.index === video.id
				}"
				*ngFor="let video of playlist?.videos | search:playlist.filter; let index = index"
				>
				<a class="" title="{{ video.snippet.title }}"
					(click)="selectVideo(video)">
					{{ index + 1 }})
					<img class="video-thumb" draggable="false" src="{{ video.snippet.thumbnails.default.url }}" title="Drag to sort">
					<span class="video-title">{{ video.snippet.title }}</span>
					<span class="badge badge-info">{{ video.time }}</span>
					<span class="label label-danger ux-maker remove-track" title="Remove From Playlist"
						(click)="removeVideo(video)"><i class="fa fa-remove"></i></span>
				</a>
			</li>
		</ul>
	</section>
	`
})
export class NowPlaylist {
	@Input() playlist: YoutubeMediaPlaylist;
	@Output() select = new EventEmitter();
	@Output() sort = new EventEmitter();
	@Output() remove = new EventEmitter();

	constructor() { }

	ngOnInit(){}

	selectVideo (media) {
		this.select.next(media);
	}

	removeVideo (media: GoogleApiYouTubeSearchResource) {
		this.remove.next(media);
	}

	sortVideo (media) {
		this.sort.next(media);
	}
}
