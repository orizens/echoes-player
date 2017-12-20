import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'player-resizer',
  styleUrls: ['./player-resizer.scss'],
  template: `
    <button title="minimize / maximize player"
      [class.full-screen]="!fullScreen"
      (click)="togglePlayer()"
      class="btn btn-sm navbar-btn show-player pull-right">
      <icon name="chevron-down" class="icon-minimize"></icon>
      <icon name="expand" class="icon-max"></icon>
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
