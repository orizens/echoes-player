import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import './player-controls.scss';

@Component({
  selector: 'player-controls',
  template: `
  <div class="btn-group player-controls">
      <button title="play previous track"
        class="btn btn-default btn-lg navbar-btn previous"
        (click)="previous.next()"
        ng-disabled="!vm.playlistHasTracks()">
        <i class="fa fa-step-backward"></i></button>

      <button title="pause"
        class="btn btn-default btn-lg navbar-btn pause"
        (click)="pause.next()">
        <i class="fa fa-pause"></i></button>

      <button title="play"
        class="btn btn-default btn-lg navbar-btn play"
        (click)="play.next(media)">
        <i class="fa fa-play"></i></button>

      <button title="play next track"
        class="btn btn-default btn-lg navbar-btn next"
        (click)="next.next()"
        ><i class="fa fa-step-forward"></i></button>
  </div>
  `
})
export class PlayerControlsComponent implements OnInit {
  @Input() media: any = {};
  @Output() play = new EventEmitter<any>();
  @Output() pause = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }
}
