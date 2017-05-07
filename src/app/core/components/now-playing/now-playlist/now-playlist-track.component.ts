import { MediaParserService } from '../../../services/media-parser.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'now-playlist-track',
  styleUrls: [ './now-playlist-track.scss' ],
  template: `
  <a class="now-playlist-track__trigger" title="{{ video.snippet.title }}"
    (click)="select.emit(video)">
    <section class="video-thumb playlist-track__thumb">
      <span class="track-number">{{ index + 1 }}</span>
      <img draggable="false" 
      [src]="videoThumb" 
      xtitle="Drag to sort">
      <span class="badge badge-info">
        {{ video.contentDetails.duration | toFriendlyDuration }}
      </span>
    </section>
    <aside class="playlist-track__content">
      <button class="btn label label-primary fa fa-list-ul playlist-track"
        *ngIf="isPlaylistMedia(video)"
        (click)="handleToggleTracks($event, video)"
        title="Album Track - click to select cued tracks"
      ></button>
      <span class="video-title">{{ video.snippet.title }}</span>
      <span class="label label-danger ux-maker remove-track" title="Remove From Playlist"
        (click)="remove.emit(video)"><i class="fa fa-trash"></i></span>
    </aside>
    <article *ngIf="displayTracks" class="track-tracks list-group">
      <aside class="album-tracks-heading">Tracks</aside>
      <button type="button" class="list-group-item btn-transparent"
        *ngFor="let track of tracks"
        (click)="handleSelectTrack($event, track, video)">
        {{ track }}
      </button>
    </article>
  </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistTrackComponent implements OnInit {
  @Input() video: GoogleApiYouTubeVideoResource;
  @Input() index: number;

  @Output() remove = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() select = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() selectTrack = new EventEmitter<{time: string, media: GoogleApiYouTubeVideoResource}>();

  displayTracks = false;
  tracks: string[] = [];

  constructor(public mediaParser: MediaParserService) { }

  ngOnInit() { }

  isPlaylistMedia (media: GoogleApiYouTubeVideoResource) {
    const tracks = this.mediaParser.extractTracks(media);
    const isArray = Array.isArray(tracks);
    if (isArray) {
      this.parseAndSaveTracks(tracks);
    }
    return isArray && this.tracks.length;
  }

  parseAndSaveTracks(tracks: string[]) {
    this.tracks = this.mediaParser.parseTracks(tracks);
  }

  toggleTracks(media: GoogleApiYouTubeVideoResource) {
    this.displayTracks = !this.displayTracks;
    return this.displayTracks;
  }

  handleToggleTracks(event: Event, media: GoogleApiYouTubeVideoResource) {
    event.stopImmediatePropagation();
    this.toggleTracks(media);
  }

  handleSelectTrack($event: Event, track: string, media: GoogleApiYouTubeVideoResource) {
    $event.stopImmediatePropagation();
    const time = this.mediaParser.extractTime(track);
    if (time) {
      this.selectTrack.emit({ time: time[0], media });
    }
  }

  get videoThumb () {
    // the type of video is missing the thumbnails object
    return this.video.snippet.thumbnails['default']['url'];
  }
}
