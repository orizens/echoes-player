import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NowPlaylistService } from '../../services';
import { INowPlaylist } from '../../models/now-playlist';
import { NowPlaylistComponent } from './now-playlist';
import { AppPlayerService } from '../../services/app-player.service';

@Component({
  selector: 'now-playing',
  styleUrls: ['./now-playing.scss'],
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
      (selectTrack)="selectTrackInVideo($event)"
      (remove)="removeVideo($event)"
    ></now-playlist>
  </div>
  `,
  // (sort)="sortVideo($event)"
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlayingComponent implements OnInit {
  public nowPlaylist$: Observable<INowPlaylist>;
  @ViewChild(NowPlaylistComponent) nowPlaylistComponent: NowPlaylistComponent;

  constructor(public nowPlaylistService: NowPlaylistService,
              private appPlayerService: AppPlayerService) {
  }

  ngOnInit() {
    this.nowPlaylist$ = this.nowPlaylistService.playlist$;
  }

  selectVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new AppPlayer.PlayVideo(media));
    this.appPlayerService.play(media);
    this.nowPlaylistService.updateIndexByMedia(media.id);
  }

  sortVideo() {}

  updateFilter(searchFilter: string) {
    this.nowPlaylistService.updateFilter(searchFilter);
  }

  resetFilter() {
    this.nowPlaylistService.updateFilter('');
  }

  clearPlaylist() {
    this.nowPlaylistService.clearPlaylist();
  }

  removeVideo(media) {
    this.nowPlaylistService.removeVideo(media);
  }

  onHeaderClick() {
    this.nowPlaylistComponent.scrollToActiveTrack();
  }

  selectTrackInVideo(trackEvent: { time: string; media: GoogleApiYouTubeVideoResource }) {
    // this.store.dispatch(new AppPlayer.PlayVideo(trackEvent.media));
    this.appPlayerService.play(trackEvent.media);
    this.nowPlaylistService.seekToTrack(trackEvent);
  }
}
