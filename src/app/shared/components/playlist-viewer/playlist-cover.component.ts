import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'playlist-cover',
  styleUrls: ['./playlist-cover.scss'],
  template: `
  <div class="playlist-cover is-flex-row is-flex-valign">
    <div class="cover-bg" [ngStyle]="{ 'background-image': 'url(' + thumbUrl + ')' }"></div>
    <div class="btn btn-transparent playlist-thumbnail">
      <img [src]="thumbUrl">
    </div>
    <div class="actions is-flex-2">
      <button class="btn btn-lg ux-maker play-media bg-primary"
        (click)="play.emit(playlist)" title="play playlist">
        <icon name="play"></icon>
      </button>
      <button class="btn btn-lg ux-maker play-media bg-primary"
        (click)="queue.emit(playlist)" title="queue playlist">
        <icon name="share"></icon>
      </button>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistCoverComponent implements OnInit {
  @Input() playlist: GoogleApiYouTubePlaylistResource;
  @Output() play = new EventEmitter<GoogleApiYouTubePlaylistResource>();
  @Output() queue = new EventEmitter<GoogleApiYouTubePlaylistResource>();

  constructor() {}

  ngOnInit() {}

  get title() {
    return this.playlist && this.playlist.snippet
      ? this.playlist.snippet.title
      : '...';
  }

  get total() {
    return this.playlist && this.playlist.contentDetails
      ? this.playlist.contentDetails.itemCount
      : '...';
  }

  get thumbUrl() {
    const thumbnails = this.playlist && this.playlist.snippet.thumbnails;
    const sizes = ['default', 'medium'];
    return sizes.reduce(
      (acc, size) => thumbnails.hasOwnProperty(size) && thumbnails[size].url,
      ''
    );
  }
}
