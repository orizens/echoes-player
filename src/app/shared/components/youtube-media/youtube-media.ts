import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import './youtube-media.scss';

@Component({
  selector: 'youtube-media',
  template: require('./youtube-media.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeMedia {
  @Input() media: any;
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() add = new EventEmitter();

  showDesc = false;
  isPlaying = false;

  constructor () {}

  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.play.next(media);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.queue.next(media);
  }

  addVideo (media: GoogleApiYouTubeVideoResource) {
    this.add.next(media);
  }

  toggle (showDesc: Boolean) {
    this.showDesc = !showDesc;
  }
}
