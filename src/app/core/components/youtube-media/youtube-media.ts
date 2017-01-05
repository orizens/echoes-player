import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { YoutubeMediaResource } from '../../interfaces/youtube.media.resource.d';
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

  playVideo (media: YoutubeMediaResource) {
    this.play.next(media);
  }

  queueVideo(media: YoutubeMediaResource) {
    this.queue.next(media);
  }

  addVideo (media: YoutubeMediaResource) {
    this.add.next(media);
  }

  toggle (showDesc: Boolean) {
    this.showDesc = !showDesc;
  }
}
