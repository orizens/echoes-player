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
  <div class="btn-group player-controls">
    <button *ngFor="let control of controls"
      [title]="control.title"
      class="btn btn-default btn-lg navbar-btn"
      [ngClass]="[control.feature]"
      (click)="handleControl(control)">
      <i [ngClass]="['fa', control.icon]"></i>
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
      icon: 'fa-step-backward',
      handler: this.handlePrevious,
      feature: 'previous'
    },
    {
      title: 'pause',
      icon: 'fa-pause',
      handler: this.handlePause,
      feature: 'pause'
    },
    {
      title: 'play',
      icon: 'fa-play',
      handler: this.handlePlay,
      feature: 'play'
    },
    {
      title: 'play next track',
      icon: 'fa-step-forward',
      handler: this.handleNext,
      feature: 'next'
    },
    {
      title: 'repeate playlist',
      icon: 'fa-refresh',
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
