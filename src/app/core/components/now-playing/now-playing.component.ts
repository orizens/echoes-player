import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { EchoesState } from '../../store';
import { NowPlaylistService } from '../../services/now-playlist.service';
import { NowPlaylistInterface } from '../../store/now-playlist';
import { PlayerActions } from '../../store/youtube-player';
import { NowPlaylistComponent } from './now-playlist';

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
      (select)="selectVideo($event)"
      (remove)="removeVideo($event)"
    ></now-playlist>
  </div>
  `,
      // (sort)="sortVideo($event)"
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlayingComponent implements OnInit {
  public nowPlaylist$: Observable<NowPlaylistInterface>;
  @ViewChild(NowPlaylistComponent) nowPlaylistComponent: NowPlaylistComponent;

  constructor(
    public store: Store<EchoesState>,
    public nowPlaylistService: NowPlaylistService,
    public playerActions: PlayerActions
  ) {}

  ngOnInit() {
    this.nowPlaylist$ = this.nowPlaylistService.playlist$;
  }

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
