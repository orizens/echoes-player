import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { extractThumbUrl } from '../../utils/media.utils';

@Component({
  selector: 'youtube-playlist',
  styleUrls: ['./youtube-playlist.scss'],
  templateUrl: './youtube-playlist.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistComponent implements OnChanges {
  @Input() media: GoogleApiYouTubePlaylistResource;
  @Input() link = './';
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();

  isPlaying = false;
  thumb = '';

  ngOnChanges({ media }: SimpleChanges) {
    if (media && !media.firstChange || media && media.firstChange) {
      this.thumb = extractThumbUrl(this.media);
    }
  }

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.play.next(media);
  }

  queuePlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.queue.next(media);
  }
}
