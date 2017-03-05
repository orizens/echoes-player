import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import './youtube-media.scss';

interface MediaStatus {
  queued: boolean;
  isPlaying: boolean;
}

@Component({
  selector: 'youtube-media',
  template: require('./youtube-media.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeMedia {
  @Input() media: any;
  @Input() status: MediaStatus = {
    queued: false,
    isPlaying: false
  };
  @Output() play = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() queue = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() add = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() unqueue = new EventEmitter<GoogleApiYouTubeVideoResource>();

  showDesc = false;
  isPlaying = false;

  constructor () {}

  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.play.emit(media);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.queue.emit(media);
  }

  addVideo (media: GoogleApiYouTubeVideoResource) {
    this.add.emit(media);
  }

  toggle (showDesc: Boolean) {
    this.showDesc = !showDesc;
  }

  removeVideoFromQueue(media: GoogleApiYouTubeVideoResource) {
    this.unqueue.emit(media);
  }
}
