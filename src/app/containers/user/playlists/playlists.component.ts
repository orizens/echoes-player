import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../core/services';
import { AppPlayerApi } from '../../../core/api/app-player.api';

@Component({
  selector: 'playlists',
  template: `
  <section class="videos-list">
    <div class="list-unstyled ux-maker youtube-items-container clearfix">
      <youtube-playlist
        *ngFor="let playlist of playlists$ | async"
        [media]="playlist"
        link="/user/"
        (play)="playSelectedPlaylist(playlist)"
        (queue)="queueSelectedPlaylist(playlist)">
      </youtube-playlist>
    </div>
  </section>
  `
})
export class PlaylistsComponent implements OnInit {
  playlists$ = this.userProfile.userProfile$.map(user => user.playlists);

  constructor(private appPlayerApi: AppPlayerApi,
              private userProfile: UserProfile
  ) { }

  ngOnInit() { }

  playSelectedPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.playUserPlaylist(playlist);
  }

  queueSelectedPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.appPlayerApi.queueUserPlaylist(playlist);
  }
}
