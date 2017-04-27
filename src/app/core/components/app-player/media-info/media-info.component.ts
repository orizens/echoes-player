import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
// import './media-info.scss';

@Component({
  selector: 'media-info',
  styleUrls: [ './media-info.scss' ],
  template: `
  <article class="media-info ellipsis">
    <h3 class="yt-media-title ellipsis">
      <aside class="pull-left"
        title="maximize / minimize"
        (click)="handleThumbClick()">
        <img src="{{ player?.media?.snippet?.thumbnails?.default?.url }}">
        <i class="fa fa-arrows-alt" [ngClass]="{ 'invisible': _minimized }"></i>
      </aside>
      <a class="title">{{ player?.media?.snippet?.title }}</a>
    </h3>
  </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaInfoComponent implements OnInit {
  @Input() player: any = {};
  @Input() minimized: GoogleApiYouTubeVideoResource;
  @Output() thumbClick = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  handleThumbClick () {
    this.thumbClick.next();
  }

  get _minimized () {
    return !this.minimized.hasOwnProperty('id');
  }
}
