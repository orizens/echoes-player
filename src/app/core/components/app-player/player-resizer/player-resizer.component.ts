import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
// import './player-resizer.scss';

@Component({
  selector: 'player-resizer',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './player-resizer.scss' ],
  template: `
    <button title="minimize / maximize player"
      [class.full-screen]="!fullScreen"
      (click)="togglePlayer()" 
      class="btn btn-sm btn-primary navbar-btn show-player pull-right">
      <i class="fa fa-chevron-down icon-minimize"></i>
      <i class="fa fa-expand icon-max"></i>
    </button>
  `
})
export class PlayerResizerComponent implements OnInit {
  @Input() fullScreen: boolean;
  @Output() toggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit() { }

  togglePlayer() {
    this.toggle.next();
  }
}
