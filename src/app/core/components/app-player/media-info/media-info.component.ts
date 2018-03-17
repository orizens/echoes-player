import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  HostListener
} from '@angular/core';

@Component({
  selector: 'media-info',
  styleUrls: ['./media-info.scss'],
  template: `
  <article class="media-info ellipsis">
    <h3 class="yt-media-title ellipsis">

     
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

  @HostListener('window:keyup.Escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.player.fullscreen.on) {
      this.handleThumbClick();
    }
  }

  handleThumbClick() {
    this.thumbClick.next();
  }

  get _minimized() {
    return !this.minimized.hasOwnProperty('id');
  }
}
