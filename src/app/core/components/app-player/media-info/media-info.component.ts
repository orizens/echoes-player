import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  HostListener
} from '@angular/core';
import { ITrackInfoSelectEvent } from '../track-info/track-info.component';

@Component({
  selector: 'media-info',
  styleUrls: ['./media-info.scss'],
  template: `
  <article class="media-info is-flex-row is-flex-valign">
    <aside
      [ngClass]="{ 'media-thumb-container': true, 'floating': floating}"
    title="maximize / minimize"
    (click)="handleThumbClick()">
      <img class="media-thumb" *ngIf="player.media.snippet.thumbnails" [src]="player?.media?.snippet?.thumbnails?.default?.url">
      <icon name="code 2x" *ngIf="!player.media.snippet.thumbnails"></icon>
      <icon name="arrows-alt" [class.invisible]="_minimized" class="minimize-icon"></icon>
    </aside>
    <section class="title ellipsis">{{ player?.media?.snippet?.title }}</section>
    <article class="track-info" [ngClass]="{ 'show-info': displayInfo }">
      <track-info *ngIf="displayInfo" [media]="player.media"
        (selectTrack)="handleSelectTrack($event)"
        (dismiss)="toggleInfo()"></track-info>
    </article>
    <button class="btn btn-transparent text-info more-info-btn" (click)="toggleInfo()">
      <icon name="info-circle 2x"></icon>
    </button>
  </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaInfoComponent implements OnInit {
  @Input() player: any = {};
  @Input() minimized: GoogleApiYouTubeVideoResource;
  @Input() floating = false;
  @Output() thumbClick = new EventEmitter();
  @Output() seekTrack = new EventEmitter();

  displayInfo = false;
  tracks: string[] = [];

  constructor() { }

  ngOnInit() { }

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

  handleSelectTrack(event: ITrackInfoSelectEvent) {
    this.seekTrack.emit(event);
  }

  get _minimized() {
    return !this.minimized.hasOwnProperty('id');
  }
}
