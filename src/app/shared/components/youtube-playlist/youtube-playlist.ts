import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { YoutubeMediaResource } from '../../interfaces/youtube.media.resource.d';
import './youtube-playlist.scss';

@Component({
  selector: 'youtube-playlist',
  template: require('./youtube-playlist.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylist {
  @Input() media: GoogleApiYouTubePlaylistResource;
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();

  isPlaying = false;

  constructor() {

  }

  ngOnInit() {

  }

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.play.next(media);
  }

  queuePlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.queue.next(media);
  }
}
