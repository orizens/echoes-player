import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { EchoesState } from '../../store';
import { NowPlaylistService } from '../../services/now-playlist.service';
import { PlayerActions } from '../../store/youtube-player';
import { NowPlaylist } from './now-playlist';

@Component({
  selector: 'now-playing',
  template: `
  <div class="sidebar-pane">
    <now-playlist-filter
      [playlist]="nowPlaylist$ | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
      (headerClick)="onHeaderClick()"
    ></now-playlist-filter>
    <now-playlist
      [playlist]="nowPlaylist$ | async"
      [activeId]="activeTrackId$ | async"
      (select)="selectVideo($event)"
      (sort)="sortVideo($event)"
      (remove)="removeVideo($event)"
    ></now-playlist>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaying {
  public nowPlaylist$ = this.nowPlaylistService.playlist$;
  public activeTrackId$ = this.nowPlaylistService.activeTrackId$;

  @ViewChild(NowPlaylist) nowPlaylistComponent: NowPlaylist;

  constructor(
    private store: Store<EchoesState>,
    public nowPlaylistService: NowPlaylistService,
    private playerActions: PlayerActions
  ) {}

  selectVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.playerActions.playVideo(media));
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortVideo () { }

  updateFilter (searchFilter: string) {
    this.nowPlaylistService.updateFilter(searchFilter);
  }

  resetFilter () {
    this.nowPlaylistService.updateFilter('');
  }

  clearPlaylist () {
    this.nowPlaylistService.clearPlaylist();
  }

  removeVideo (media) {
    this.nowPlaylistService.removeVideo(media);
  }

  onHeaderClick() {
    this.nowPlaylistComponent.scrollToActiveTrack();
  }
}
