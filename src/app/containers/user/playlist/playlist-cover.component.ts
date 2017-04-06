import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'playlist-cover',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./playlist-cover.scss'],
  template: `
  <div class="playlist-cover clearfix">
    <div class="cover-bg" [ngStyle]="{ 'background-image': 'url(' + thumbUrl + ')' }"></div>
    <button class="btn btn-transparent col-md-2 playlist-thumbnail"
      (click)="play.emit(playlist)">
      <img [src]="thumbUrl" title="Play All">
    </button>
    <div class="actions col-md-10">
      <h4>
        <span>{{ title }} ({{ total }} videos)</span>
      </h4>
      <button class="btn btn-lg ux-maker play-media bg-primary"
        (click)="play.emit(playlist)" title="play playlist">
        <i class="fa fa-play"></i>
      </button>
      <button class="btn btn-lg ux-maker play-media bg-primary"
        (click)="queue.emit(playlist)" title="queue playlist">
        <i class="fa fa-share"></i>
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

  constructor() { }

  ngOnInit() { }

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
    return this.playlist && this.playlist.snippet
      ? this.playlist.snippet.thumbnails['default'].url
      : '...';
  }
}
