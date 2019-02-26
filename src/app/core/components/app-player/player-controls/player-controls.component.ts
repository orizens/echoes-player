import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'player-controls',
  styleUrls: ['./player-controls.scss'],
  template: `
  <div class="btn-group player-controls is-flex-row">
    <button *ngFor="let control of controls"
      [title]="control.title"
      class="btn btn-default btn-lg"
      [ngClass]="[control.feature]"
      (click)="handleControl(control)">
      <icon [name]="control.icon"></icon>
    </button>
  </div>
  `
})
export class PlayerControlsComponent {
  @Input() media: GoogleApiYouTubeVideoResource;
  @HostBinding('class.yt-repeat-on')
  @Input()
  isRepeat = false;
  @HostBinding('class.yt-playing')
  @Input()
  playing = false;
  @Output() play = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() pause = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() repeat = new EventEmitter();

  controls = [
    {
      title: 'previous',
      icon: 'step-backward',
      handler: this.handlePrevious,
      feature: 'previous'
    },
    {
      title: 'pause',
      icon: 'pause',
      handler: this.handlePause,
      feature: 'pause'
    },
    {
      title: 'play',
      icon: 'play',
      handler: this.handlePlay,
      feature: 'play'
    },
    {
      title: 'play next track',
      icon: 'step-forward',
      handler: this.handleNext,
      feature: 'next'
    },
    {
      title: 'repeat playlist',
      icon: 'repeat',
      handler: this.handleRepeat,
      feature: 'repeat'
    }
  ];

  handlePlay() {
    this.play.emit(this.media);
  }

  handlePrevious() {
    this.previous.emit();
  }

  handlePause() {
    this.pause.emit();
  }

  handleNext() {
    this.next.emit();
  }

  handleRepeat() {
    this.repeat.emit();
  }

  handleControl(control) {
    control.handler.call(this);
  }
}
