import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { YoutubeMediaPlaylist } from '../../core/store/now-playlist';
import './now-playlist-filter.less';

@Component({
  selector: 'now-playlist-filter',
  template: `
  <h3 class="nav-header user-playlists-filter">
    <span class="text">Now Playing</span>
    <button class="btn btn-link btn-xs btn-clear" title="Clear All Tracks In Now Playlist"
      [disabled]="playlist?.videos?.length === 0"
      (click)="clearPlaylist()">
      <span class="fa fa-trash-o"></span>
    </button>
    <button class="btn btn-link btn-xs btn-save" title="Save All These Tracks To A New Playlist"
      ng-disabled="!nowPlaylistFilter.playlist.length"
      ng-click="nowPlaylistFilter.togglePlaylistSaver()">
      <span class="fa fa-cloud-upload"></span>
    </button>
    <div class="playlist-filter pull-right">
      <i class="fa fa-search" *ngIf="isFilterEmpty()"></i>
      <i class="fa fa-remove text-danger" 
        *ngIf="!isFilterEmpty()" 
        (click)="resetSearchFilter()"
      ></i>
      <input type="search" name="playlist-search"
        [value]="playlist?.filter"
        #searchFilter
        (input)="handleFilterChange(searchFilter.value)">
    </div>
  </h3>
  `,
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
  @Output() clear = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() reset = new EventEmitter();

  constructor() {

  }

  handleFilterChange (searchFilter: string) {
    this.filter.next(searchFilter);
  }

  resetSearchFilter () {
    this.reset.next('');
  }

  isFilterEmpty () {
    return this.playlist.filter === '';
  }

  clearPlaylist () {
    this.clear.next('');
  }
}
