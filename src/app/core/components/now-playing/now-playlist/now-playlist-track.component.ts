import { MediaParserService } from '@core/services/media-parser.service';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { flyOut, flyInOut } from '@shared/animations/fade-in.animation';

@Component({
  selector: 'now-playlist-track',
  styleUrls: ['./now-playlist-track.scss'],
  template: `
  <div class="now-playlist-track__trigger">
    <div class="track-contents">
      <section class="video-thumb playlist-track__thumb"
        (click)="markSelected(video)">
        <span class="track-number">{{ index + 1 }}</span>
        <img draggable="false" class="video-thumb__image"
        src="{{ video | videoToThumb }}"
        xtitle="Drag to sort">
        <span class="badge badge-info">
          {{ video.contentDetails.duration | toFriendlyDuration }}
        </span>
      </section>

      <section class="video-title" (click)="markSelected(video)" [tooltip]="video.snippet.title">{{ video.snippet.title }}</section>
      </div>
    <aside class="playlist-track__content">
      <section class="track-actions">
        <button class="btn btn-transparent text-primary playlist-track"
          *ngIf="isPlaylistMedia(video)"
          (click)="handleToggleTracks($event, video)"
          tooltip="Album Track - click to select cued tracks">
          <icon name="list-ul"></icon>
        </button>
        <button class="btn btn-transparent text-info playlist-track"
          (click)="toggleInfo()"
          tooltip="More information for this media">
          <icon name="info-circle"></icon>
        </button>
      </section>
      <button class="btn btn-transparent text-danger ux-maker remove-track" tooltip="Remove From Playlist"
        (click)="remove.emit(video)">
        <icon name="trash"></icon>
      </button>
    </aside>
    <article [@flyInOut] *ngIf="displayTracks" class="track-tracks list-group">
      <aside class="album-tracks-heading">Tracks</aside>
      <button type="button" class="list-group-item btn-transparent"
        *ngFor="let track of tracks | parseTracks"
        (click)="handleSelectTrack($event, track, video)">
        {{ track }}
      </button>
    </article>
    <article [@flyOut] *ngIf="displayInfo" class="track-info">
      {{ video.snippet.description }}
    </article>
  </div>
  `,
  animations: [flyOut, flyInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistTrackComponent implements AfterContentInit {
  @Input() video: GoogleApiYouTubeVideoResource;
  @Input() index: number;

  @Output() remove = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() select = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output()
  selectTrack = new EventEmitter<{
    time: string;
    media: GoogleApiYouTubeVideoResource;
  }>();

  displayTracks = false;
  displayInfo = false;
  tracks: string[] = [];
  hasTracks = false;
  private parsedTracks = false;

  constructor(public mediaParser: MediaParserService) {}

  ngAfterContentInit() {
    this.extractTracks(this.video);
  }

  extractTracks(media: GoogleApiYouTubeVideoResource) {
    if (!this.parsedTracks) {
      const tracks = this.mediaParser.extractTracks(media.snippet.description);
      if (Array.isArray(tracks)) {
        this.parsedTracks = true;
        this.tracks = tracks;
        this.hasTracks = true;
      }
    }
  }

  isPlaylistMedia(media: GoogleApiYouTubeVideoResource) {
    return this.hasTracks;
  }

  toggleTracks(media: GoogleApiYouTubeVideoResource) {
    this.displayTracks = !this.displayTracks;
    return this.displayTracks;
  }

  handleToggleTracks(event: Event, media: GoogleApiYouTubeVideoResource) {
    event.stopImmediatePropagation();
    this.toggleTracks(media);
  }

  handleSelectTrack(
    $event: Event,
    track: string,
    media: GoogleApiYouTubeVideoResource
  ) {
    $event.stopImmediatePropagation();
    const time = this.mediaParser.extractTime(track);
    if (time) {
      this.selectTrack.emit({ time: time[0], media });
    }
  }

  markSelected(video: GoogleApiYouTubeVideoResource) {
    this.select.emit(video);
  }

  toggleInfo() {
    this.displayInfo = !this.displayInfo;
    return this.displayInfo;
  }
}
