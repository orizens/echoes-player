import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'player-controls',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './player-controls.scss' ],
  template: `
  <div class="btn-group player-controls">
      <button title="play previous track"
        class="btn btn-default btn-lg navbar-btn previous"
        (click)="handlePrevious()">
        <i class="fa fa-step-backward"></i></button>

      <button title="pause"
        class="btn btn-default btn-lg navbar-btn pause"
        (click)="handlePause()">
        <i class="fa fa-pause"></i></button>

      <button title="play"
        class="btn btn-default btn-lg navbar-btn play"
        (click)="handlePlay()">
        <i class="fa fa-play"></i></button>

      <button title="play next track"
        class="btn btn-default btn-lg navbar-btn next"
        (click)="handleNext()"
        ><i class="fa fa-step-forward"></i></button>
  </div>
  `
})
export class PlayerControlsComponent {
  @Input() media: GoogleApiYouTubeVideoResource;
  @Output() play = new EventEmitter<GoogleApiYouTubeVideoResource>();
  @Output() pause = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();

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
}
