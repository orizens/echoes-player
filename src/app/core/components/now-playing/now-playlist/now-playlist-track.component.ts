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
    <article *ngIf="displayTracks" class="track-tracks">
      <button type="button" class="btn btn-primary"
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

  private HH_MM_SSre = /(\d{1,2}):\d{2}:?\d{0,2}/;

  constructor() { }

  ngOnInit() { }

  isPlaylistMedia (media: GoogleApiYouTubeVideoResource) {
    const tracks = this.extractTracks(media);
    const isArray = Array.isArray(tracks);
    return isArray;
  }

  extractTracks(media: GoogleApiYouTubeVideoResource) {
    // const re = /(([0-9]{0,1}[0-9]):([0-9][0-9]){0,1}:{0,1}([0-9][0-9]){0,1}\s*)([\w\s/]*[^ 0-9:/\n\b])/;
    const LINE_WITH_TRACKre = /([a-zA-Z $().\d]){0,}(\d{1,2}:\d{2}:{0,1}\d{0,2})+([a-zA-Z $]){0,}/;
    const hasTracksRegexp = new RegExp(LINE_WITH_TRACKre, 'gmi');
    const tracks = media.snippet.description.match(hasTracksRegexp);
    // make sure there's a first track
    if (tracks && tracks.length && !tracks[0].includes('00:0')) {
      tracks.unshift('00:00');
    }
    this.parseAndSaveTrack(tracks);
    return tracks;
  }

  parseAndSaveTrack(tracks: string[]) {
    if (tracks) {
      const re = this.HH_MM_SSre;
      this.tracks = tracks
        .filter((track: string) => {
          const isTrack = re.test(track);
          return isTrack;
        });
    }
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
    const HH_MM_SSre = this.HH_MM_SSre;
    const title = track.match(HH_MM_SSre);
    if (title) {
      this.selectTrack.emit({ time: title[0], media });
    }
  }

  get videoThumb () {
    // the type of video is missing the thumbnails object
    return this.video.snippet.thumbnails['default']['url'];
  }
}
