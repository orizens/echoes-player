import { EchoesState } from '../../../core/store';
import { UserProfileActions } from '../../../core/store/user-profile';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'playlist-viewer',
  styleUrls: ['./playlist.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <playlist-cover
    [playlist]="playlist"
    (play)="onPlayPlaylist($event)"
    (queue)="onQueuePlaylist($event)">
  </playlist-cover>
  <section class="col-md-12">
    <youtube-list
      [list]="videos"
      (play)="onPlayVideo($event)"
      (queue)="onQueueVideo($event)"
    ></youtube-list>
  </section>
  `
})
export class PlaylistViewerComponent implements OnInit {
  @Input() videos: GoogleApiYouTubeVideoResource[] = [];
  @Input() playlist: GoogleApiYouTubePlaylistResource;

  @Output() queuePlaylist = new EventEmitter<GoogleApiYouTubePlaylistResource>();
  @Output() playPlaylist = new EventEmitter<GoogleApiYouTubePlaylistResource>();
  @Output() queueVideo = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() playVideo = new EventEmitter<GoogleApiYouTubeVideoResource>();

  constructor() {}

  ngOnInit() {
  }

  onPlayPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.playPlaylist.emit(playlist);
    // this.userPlayerService.playSelectedPlaylist(playlist);
  }

  onQueueVideo(media: GoogleApiYouTubeVideoResource) {
    // this.userPlayerService.queueVideo(media);
  }

  onPlayVideo(media: GoogleApiYouTubeVideoResource) {
    // this.userPlayerService.playVideo(media);
  }

  onQueuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.queuePlaylist.emit(playlist);
    // this.userPlayerService.queuePlaylist(playlist);
  }
}
