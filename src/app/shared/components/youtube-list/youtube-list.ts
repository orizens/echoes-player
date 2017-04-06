import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { YoutubeMediaComponent } from '../youtube-media/youtube-media';
// import './youtube-list.scss';

@Component({
  selector: 'youtube-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './youtube-list.scss' ],
  template: `
  <ul class="list-unstyled clearfix">
    <li class="youtube-list-item" *ngFor="let media of list">
      <youtube-media
        [media]="media"
        [status]="getMediaStatus(media)"
        (play)="playSelectedVideo(media)"
        (queue)="queueSelectedVideo(media)"
        (unqueue)="unqueueSelectedVideo(media)"
        (add)="addVideo(media)">
      </youtube-media>
    </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeListComponent {
  @Input() list: GoogleApiYouTubeVideoResource[] = [];
  @Input() queued: GoogleApiYouTubeVideoResource[] = [];
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() unqueue = new EventEmitter();

  constructor() {}

  playSelectedVideo(media) {
    this.play.emit(media);
  }

  queueSelectedVideo(media) {
    this.queue.emit(media);
  }

  addVideo(media) {
    this.add.emit(media);
  }

  unqueueSelectedVideo(media) {
    this.unqueue.emit(media);
  }

  getMediaStatus(media: GoogleApiYouTubeVideoResource) {
    return {
      queued: this.queued.findIndex(queue => queue.id === media.id) >= 0
    };
  }
}
