import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  AfterContentInit,
  Output,
  HostListener
} from '@angular/core';
import { MediaParserService } from '../../../../core/services';

@Component({
  selector: 'media-info',
  styleUrls: ['./media-info.scss'],
  template: `
  <article class="media-info is-flex-row is-flex-valign">
    <aside class="media-thumb-container"
    title="maximize / minimize"
    (click)="handleThumbClick()">
      <img class="media-thumb" *ngIf="player.media.snippet.thumbnails" [src]="player?.media?.snippet?.thumbnails?.default?.url">
      <icon name="code 2x" *ngIf="!player.media.snippet.thumbnails"></icon>
      <icon name="arrows-alt" [class.invisible]="_minimized" class="minimize-icon"></icon>
    </aside>
    <a class="title ellipsis">{{ player?.media?.snippet?.title }}</a>
    <article class="track-info" [ngClass]="{ 'show-info': displayInfo }">
      <nav class="is-flex-row is-justify-right is-sticky">
        <button (click)="toggleInfo()" class="btn btn-default">
          <icon name="close"></icon>
          Close
        </button>
      </nav>
      {{ player.media.snippet.description }}
      <div class="track-tracks list-group" *ngIf="hasTracks()">
        <h3 class="text-primary">Tracks (Select &amp; Play)</h3>
        <button class="list-group-item btn-transparent"
          *ngFor="let track of tracks | parseTracks"
          (click)="handleSelectTrack($event, track, player.media)">
          {{ track }}
        </button>
      </div>
    </article>
    <button class="btn btn-transparent text-info more-info-btn" (click)="toggleInfo()">
      <icon name="info-circle 2x"></icon>
    </button>
  </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaInfoComponent implements OnInit, AfterContentInit {
  @Input() player: any = {};
  @Input() minimized: GoogleApiYouTubeVideoResource;
  @Output() thumbClick = new EventEmitter();
  @Output() seekTrack = new EventEmitter();

  displayInfo = false;
  tracks: string[] = [];

  constructor(public mediaParser: MediaParserService) {}

  ngOnInit() {}

  ngAfterContentInit() {
    if (this.player.media) {
      this.extractTracks(this.player.media);
    }
  }

  extractTracks(media: GoogleApiYouTubeVideoResource) {
    const tracks = this.mediaParser.extractTracks(media.snippet.description);
    if (Array.isArray(tracks)) {
      this.tracks = tracks;
    }
  }

  @HostListener('window:keyup.Escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.player.fullscreen.on) {
      this.handleThumbClick();
    }
  }

  handleThumbClick() {
    this.thumbClick.next();
  }

  toggleInfo() {
    this.displayInfo = !this.displayInfo;
  }

  handleSelectTrack(
    $event: Event,
    track: string,
    media: GoogleApiYouTubeVideoResource
  ) {
    $event.stopImmediatePropagation();
    const time = this.mediaParser.extractTime(track);
    if (time) {
      this.seekTrack.emit({ time: time[0], media });
    }
  }

  hasTracks() {
    return this.tracks.length > 0;
  }

  get _minimized() {
    return !this.minimized.hasOwnProperty('id');
  }
}
