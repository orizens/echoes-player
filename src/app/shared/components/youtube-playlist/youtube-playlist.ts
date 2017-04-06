import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import './youtube-playlist.scss';

@Component({
  selector: 'youtube-playlist',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './youtube-playlist.scss' ],
  templateUrl: './youtube-playlist.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistComponent {
  // GoogleApiYouTubePlaylistResource
  @Input() media: any;
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();

  isPlaying = false;

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.play.next(media);
  }

  queuePlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.queue.next(media);
  }
}
