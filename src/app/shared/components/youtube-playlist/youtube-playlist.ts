import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'youtube-playlist',
  styleUrls: ['./youtube-playlist.scss'],
  templateUrl: './youtube-playlist.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlaylistComponent {
  @Input() media: GoogleApiYouTubePlaylistResource;
  @Input() link = './';
  @Input() playIcon = 'youtube-play 2x'
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() navigated = new EventEmitter();

  isPlaying = false;
  loading = false;

  playPlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.play.next(media);
  }

  queuePlaylist(media: GoogleApiYouTubePlaylistResource) {
    this.queue.next(media);
  }

  onNavigateToPlaylist() {
    this.loading = true;
    this.navigated.emit();
  }
}
