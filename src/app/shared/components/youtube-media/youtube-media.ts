import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ICON_PREFIX_BRAND } from '@shared/directives/icon';

@Component({
  selector: 'youtube-media',
  styleUrls: ['./youtube-media.scss'],
  templateUrl: './youtube-media.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeMediaComponent {
  @Input() media: GoogleApiYouTubeVideoResource;
  @Input() queued = false;
  @Output() play = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() queue = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() add = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() unqueue = new EventEmitter<GoogleApiYouTubeVideoResource>();

  showDesc = false;
  isPlaying = false;
  ICON_PREFIX_BRAND = ICON_PREFIX_BRAND;

  constructor() {}

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.play.emit(media);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.queue.emit(media);
  }

  addVideo(media: GoogleApiYouTubeVideoResource) {
    this.add.emit(media);
  }

  toggle(showDesc: Boolean) {
    this.showDesc = !showDesc;
  }

  removeVideoFromQueue(media: GoogleApiYouTubeVideoResource) {
    this.unqueue.emit(media);
  }
}
