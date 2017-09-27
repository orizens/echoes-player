import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'image-blur',
  styleUrls: [ './image-blur.scss' ],
  template: `
  <div class="media-bg" [ngStyle]="style"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBlurComponent {
  @Input() media: GoogleApiYouTubeVideoResource;
  get style () {
    return {
      backgroundImage: this.media && this.media.snippet ? `url(${this.media.snippet.thumbnails['high'].url})` : ''
    };
  }
}
