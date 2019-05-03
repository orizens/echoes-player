import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MediaParserService } from '../../../../core/services';
import { ButtonGroupButton } from '@shared/components/button-group';

export interface ITrackInfoSelectEvent {
  time: string;
  media: GoogleApiYouTubeVideoResource;
}

@Component({
  selector: 'track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackInfoComponent {
  @Input()
  set media(_media: GoogleApiYouTubeVideoResource) {
    if (_media) {
      this.extractTracks(_media);
      this.description = _media.snippet.description;
      this.video = _media;
    }
  }
  @Output() selectTrack = new EventEmitter<ITrackInfoSelectEvent>();
  @Output() dismiss = new EventEmitter();

  video: GoogleApiYouTubeVideoResource;
  description = '';
  tracks = [];
  infoButtons = [
    { label: 'About', value: 'about' },
    { label: 'Tracks', value: 'tracks' }
  ];
  selected = this.infoButtons[0];

  constructor(private mediaParser: MediaParserService) {}

  hasTracks() {
    return this.tracks.length > 0;
  }

  extractTracks(media: GoogleApiYouTubeVideoResource) {
    const tracks = this.mediaParser.extractTracks(media.snippet.description);
    if (Array.isArray(tracks)) {
      this.tracks = tracks;
    }
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

  toggleInfo() {
    this.dismiss.emit();
  }

  onInfoClick(event: ButtonGroupButton) {
    this.selected = event;
  }
}
