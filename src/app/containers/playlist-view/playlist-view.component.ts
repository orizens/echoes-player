import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EchoesState } from '../../core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserProfileActions } from '../../core/store/user-profile';
import { NowPlaylistActions, LoadPlaylistAction, PlayPlaylistAction } from '../../core/store/now-playlist';

import { PlaylistProxy } from './playlist-view.proxy';

@Component({
  selector: 'playlist-view',
  styleUrls: ['./playlist-view.component.scss'],
  template: `
  <article>
    <app-navbar [header]="header$ | async"
      [mainIcon]="'chevron-left'"
      (headerMainIconClick)="handleBack()">
    </app-navbar>
    <div class="row">
      <playlist-viewer class="clearfix"
        [videos]="videos$ | async"
        [playlist]="playlist$ | async"
        [queuedPlaylist]="nowPlaylist$ | async"
        (playPlaylist)="playPlaylist($event)"
        (queuePlaylist)="queuePlaylist($event)"
        (playVideo)="playVideo($event)"
        (queueVideo)="queueVideo($event)"
        (unqueueVideo)="unqueueVideo($event)"
      ></playlist-viewer>
    </div>
  </article>
  `
})
export class PlaylistViewComponent implements OnInit {
  playlist$ = this.playlistProxy.fetchPlaylist(this.route);
  videos$ = this.playlistProxy.fetchPlaylistVideos(this.route);
  header$ = this.playlistProxy.fetchPlaylistHeader(this.route);
  nowPlaylist$ = this.playlistProxy.nowPlaylist$;

  constructor(private playlistProxy: PlaylistProxy, private route: ActivatedRoute) { }

  ngOnInit() { }

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.playlistProxy.playPlaylist(playlist);
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.playlistProxy.queuePlaylist(playlist);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.playlistProxy.queueVideo(media);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.playlistProxy.playVideo(media);
  }

  unqueueVideo(media: GoogleApiYouTubeVideoResource) {
    this.playlistProxy.unqueueVideo(media);
  }

  handleBack() {
    this.playlistProxy.goBack();
  }
}
