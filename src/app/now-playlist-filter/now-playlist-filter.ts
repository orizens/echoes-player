import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgModel, NgIf } from '@angular/common';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { YoutubeMediaPlaylist } from '../core/store/now-playlist';

@Component({
	selector: 'now-playlist-filter',
	template: require('./now-playlist-filter.html'),
	directives: [ NgModel ],
	styles: [`
		:host [hidden] {
			display: none;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistFilter {
	@Input() playlist: YoutubeMediaPlaylist;
	// @Output() save = new EventEmitter();
	// @Output() clear = new EventEmitter();
	// @Output() change = new EventEmitter();

	constructor(private nowPlaylistService: NowPlaylistService) {

	}

	ngOnInit(){

	}

	handleFilterChange (searchFilter: string) {
		this.nowPlaylistService.updateFilter(searchFilter);
	}

	resetSearchFilter () {
		this.nowPlaylistService.updateFilter('');
	}

	isFilterEmpty () {
		return this.playlist.filter === '';
	}

	clearPlaylist () {
		this.nowPlaylistService.clearPlaylist();
	}
}