import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NowPlaylistInterface } from '../../../store/now-playlist';

@Component({
  selector: 'now-playlist-filter',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './now-playlist-filter.scss' ],
  template: `
  <h3 class="nav-header user-playlists-filter">
    <span class="playlist-header" (click)="onNowPlayingClick()">  
      <i class="fa fa-play-circle-o"></i>
      <span class="text btn-transparent playlist-count" title="Reveal now playing track">
        Now Playing <span *ngIf="!isPlaylistEmpty()">({{ playlistLength }})</span>
      </span>
    </span>
    <button class="btn btn-link btn-xs btn-clear" title="Clear All Tracks In Now Playlist"
      [disabled]="isPlaylistEmpty()"
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
        [value]="playlist.filter"
        #searchFilter
        (input)="handleFilterChange(searchFilter.value)">
    </div>
  </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistFilterComponent {
  @Input() playlist: NowPlaylistInterface;
  // @Output() save = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() headerClick = new EventEmitter();

  constructor() {}

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

  isPlaylistEmpty() {
    return this.playlistLength === 0;
  }

  onNowPlayingClick() {
    this.headerClick.next();
  }
  get playlistLength () {
    return this.playlist.videos.length;
  }
}
