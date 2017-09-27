import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import './youtube-playlist.scss';

@Component({
  selector: 'youtube-playlist',
  styleUrls: [ './youtube-playlist.scss' ],
  templateUrl: './youtube-playlist.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistComponent {
  @Input() media: GoogleApiYouTubePlaylistResource;
  @Input() link = './';
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
