import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  QueryList,
  ViewChildren,
  AfterViewChecked
} from '@angular/core';
import { NowPlaylistInterface } from '../../../store/now-playlist';
import { fadeOutAnimation } from '../../../../shared/animations';
import './now-playlist.scss';

@Component({
  animations: [
    fadeOutAnimation()
  ],
  selector: 'now-playlist',
  template: `
  <section class="now-playlist ux-maker"
    >
    <ul class="nav nav-list ux-maker nicer-ux">
      <li class="now-playlist-track" #playlistTrack
        [ngClass]="{
          'active': isActiveMedia(video.id, playlistTrack),
          'playlist-media': isPlaylistMedia(video)
        }"
        *ngFor="let video of playlist?.videos | search:playlist.filter; let index = index"
        [@fadeIn]
        >
        <a class="" title="{{ video.snippet.title }}"
          (click)="selectVideo(video)">
          <span class="label label-primary fa fa-list-ul playlist-track"
            title="Includes specific cued tracks - soon to come..."
          ></span>
          <span class="track-number">{{ index + 1 }}</span>
          <section class="video-thumb">
            <img draggable="false" 
            src="{{ video.snippet.thumbnails.default.url }}" 
            xtitle="Drag to sort">
            <span class="badge badge-info">
              {{ video.contentDetails.duration | toFriendlyDuration }}
            </span>
          </section>
          <span class="video-title">{{ video.snippet.title }}</span>
          <span class="label label-danger ux-maker remove-track" title="Remove From Playlist"
            (click)="removeVideo(video)"><i class="fa fa-trash"></i></span>
        </a>
      </li>
    </ul>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylist implements OnChanges, AfterViewChecked {
  @Input() playlist: NowPlaylistInterface;
  @Input() activeId: string;

  @Output() select = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() remove = new EventEmitter();

  private activeTrackElement: HTMLUListElement;
  private hasActiveChanged: boolean = false;

  @ViewChildren(HTMLLIElement) tracks: QueryList<HTMLLIElement>;

  constructor(private zone: NgZone) { }

  ngAfterViewChecked() {
    if (this.hasActiveChanged && this.activeTrackElement) {
      this.zone.runOutsideAngular(() => this.scrollToActiveTrack());
    }
  }

  ngOnChanges(changes) {
    const activeId = changes.activeId;
    const hasChanges = this.hasChanges(activeId);
    const currentValue = hasChanges && changes.activeId.currentValue;
    const prevValue = hasChanges && changes.activeId.previousValue;
    this.hasActiveChanged = currentValue !== prevValue;
  }

  scrollToActiveTrack() {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView();
    }
  }

  selectVideo (media) {
    this.select.next(media);
  }

  removeVideo (media: GoogleApiYouTubeSearchResource) {
    this.remove.next(media);
  }

  sortVideo (media) {
    this.sort.next(media);
  }

  isActiveMedia(mediaId: string, trackElement: HTMLUListElement) {
    const isActive = this.playlist.selectedId === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }
  // TODO - extract to a service
  isPlaylistMedia (media) {
    const hasTracksRegexp = new RegExp(
      '(([0-9]{0,1}[0-9]):([0-9][0-9]){0,1}:{0,1}([0-9][0-9]){0,1})',
      'gm'
    );
    const tracks = media.snippet.description.match(hasTracksRegexp);
    return Array.isArray(tracks);
  }

  private hasChanges(changes) {
    return changes && changes.hasOwnProperty('currentValue') && changes.hasOwnProperty('previousValue');
  }
}
