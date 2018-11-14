import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import * as NowPlaylist from '@store/now-playlist';

@Component({
  selector: 'now-playlist-filter',
  styleUrls: ['./now-playlist-filter.scss'],
  template: `
  <section class="nav-header user-playlists-filter">
  <span class="playlist-header" (click)="onNowPlayingClick()">
      <icon name="play-circle-o" class="text-primary"></icon>
      <span class="text btn-transparent playlist-count"
        tooltip="Reveal now playing track">
        Now Playing <span *ngIf="!isPlaylistEmpty()">({{ playlistLength }})</span>
      </span>
    </span>
    <button class="btn btn-link btn-xs btn-clear"
      tooltip="Clear All Tracks In Now Playlist"
      [disabled]="isPlaylistEmpty()"
      (click)="clearPlaylist()">
      <icon name="trash"></icon>
    </button>
    <button class="btn btn-link btn-xs btn-save" title="Save All These Tracks To A New Playlist"
      disabled
      ng-disabled="!nowPlaylistFilter.playlist.length"
      ng-click="nowPlaylistFilter.togglePlaylistSaver()">
      <icon name="cloud-upload-alt"></icon>
    </button>
    <div class="playlist-filter">
      <icon name="search" *ngIf="isFilterEmpty()"></icon>
      <icon name="times" class="text-danger"
        *ngIf="!isFilterEmpty()"
        (click)="resetSearchFilter()"
      ></icon>
      <input type="search" name="playlist-search"
        [value]="playlist.filter"
        #searchFilter
        (input)="handleFilterChange(searchFilter.value)">
    </div>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistFilterComponent {
  @Input() playlist: NowPlaylist.INowPlaylist;
  // @Output() save = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() filter = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Output() headerClick = new EventEmitter();

  constructor() {}

  handleFilterChange(searchFilter: string) {
    this.filter.next(searchFilter);
  }

  resetSearchFilter() {
    this.reset.next('');
  }

  isFilterEmpty() {
    return this.playlist.filter === '';
  }

  clearPlaylist() {
    this.clear.next('');
  }

  isPlaylistEmpty() {
    return this.playlistLength === 0;
  }

  onNowPlayingClick() {
    this.headerClick.next();
  }
  get playlistLength() {
    return this.playlist.videos.length;
  }
}
