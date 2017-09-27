import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'playlist-viewer',
  styleUrls: ['./playlist-viewer.scss'],
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
      [queued]="queuedPlaylist"
      (play)="onPlayVideo($event)"
      (queue)="onQueueVideo($event)"
      (unqueue)="onRemove($event)"
    ></youtube-list>
  </section>
  `
})
export class PlaylistViewerComponent implements OnInit {
  @Input() videos: GoogleApiYouTubeVideoResource[] = [];
  @Input() playlist: GoogleApiYouTubePlaylistResource;
  @Input() queuedPlaylist = [];

  @Output() queuePlaylist = new EventEmitter<GoogleApiYouTubePlaylistResource>();
  @Output() playPlaylist = new EventEmitter<GoogleApiYouTubePlaylistResource>();
  @Output() queueVideo = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() playVideo = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() unqueueVideo = new EventEmitter<GoogleApiYouTubeVideoResource>();

  constructor() {}

  ngOnInit() {
  }

  onPlayPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.playPlaylist.emit(playlist);
  }

  onQueueVideo(media: GoogleApiYouTubeVideoResource) {
    this.queueVideo.emit(media);
  }

  onPlayVideo(media: GoogleApiYouTubeVideoResource) {
    this.playVideo.emit(media);
  }

  onQueuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.queuePlaylist.emit(playlist);
  }

  onRemove(media: GoogleApiYouTubeVideoResource) {
    this.unqueueVideo.emit(media);
  }
}
