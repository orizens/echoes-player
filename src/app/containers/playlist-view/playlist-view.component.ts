import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NowPlaylistService } from '../../core/services/now-playlist.service';
import { AppApi } from '../../core/api/app.api';
import { AppPlayerApi } from '../../core/api/app-player.api';

export interface PlaylistData {
  videos: GoogleApiYouTubeVideoResource[];
  playlist: GoogleApiYouTubePlaylistResource;
}

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
  playlist$ = this.route.data.map((data: PlaylistData) => data.playlist);
  videos$ = this.route.data.map((data: PlaylistData) => data.videos);
  header$ = this.route.data.map((data: PlaylistData) => {
    const playlist = data.playlist;
    const { snippet, contentDetails } = playlist;
    return `${snippet.title} (${contentDetails.itemCount} videos)`;
  });

  nowPlaylist$ = this.nowPlaylistService.playlist$.map(p => p.videos);

  constructor(private route: ActivatedRoute,
              private nowPlaylistService: NowPlaylistService,
              private appPlayerApi: AppPlayerApi,
              private appApi: AppApi) { }

  ngOnInit() { }

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.playPlaylist(playlist);
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.queuePlaylist(playlist);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideo(media);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo(media);
  }

  unqueueVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.removeVideoFromPlaylist(media);
  }

  handleBack() {
    this.appApi.navigateBack();
  }
}
