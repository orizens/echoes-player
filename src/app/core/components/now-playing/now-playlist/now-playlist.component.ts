import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
  AfterViewChecked,
  NgZone
} from '@angular/core';
import * as NowPlaylist from '../../../store/now-playlist';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { flyOut } from '../../../../shared/animations/fade-in.animation';

@Component({
  selector: 'now-playlist',
  animations: [flyOut],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./now-playlist.scss'],
  template: `
  <section class="now-playlist ux-maker">
    <ul class="nav nav-list ux-maker nicer-ux">
      <li class="now-playlist-track" #playlistTrack
        [ngClass]="{
          'active': isActiveMedia(video.id, playlistTrack)
        }"
        *ngFor="let video of playlist.videos | search:playlist.filter; let index = index"
        [@flyOut]>
        <now-playlist-track
          [video]="video" [index]="index"
          (remove)="removeVideo($event)"
          (select)="selectVideo(video)"
          (selectTrack)="selectTrackInVideo($event)"
        ></now-playlist-track>
      </li>
    </ul>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistComponent implements OnChanges, AfterViewChecked {
  @Input() playlist: NowPlaylist.INowPlaylist;
  @Output() select = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output()
  selectTrack = new EventEmitter<{
    time: string;
    media: GoogleApiYouTubeVideoResource;
  }>();
  // @Output() sort = new EventEmitter<GoogleApiYouTubeSearchResource>();
  @Output() remove = new EventEmitter<GoogleApiYouTubeVideoResource>();

  public activeTrackElement: HTMLUListElement;
  public hasActiveChanged = false;

  constructor(public zone: NgZone) {}

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

  selectVideo(media: GoogleApiYouTubeVideoResource) {
    this.select.emit(media);
  }

  removeVideo(media: GoogleApiYouTubeVideoResource) {
    this.remove.emit(media);
  }

  sortVideo(media: GoogleApiYouTubeVideoResource) {
    // this.sort.next(media);
  }

  isActiveMedia(mediaId: string, trackElement: HTMLUListElement) {
    const isActive = this.playlist.selectedId === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }

  selectTrackInVideo(trackEvent: { time; media }) {
    this.selectTrack.emit(trackEvent);
  }

  private hasChanges(changes) {
    return changes && changes.hasOwnProperty('currentValue') && changes.hasOwnProperty('previousValue');
  }
}
