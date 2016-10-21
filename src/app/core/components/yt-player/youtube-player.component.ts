import {
  Component, EventEmitter, Input, Output,
  ChangeDetectionStrategy, OnInit,
  AfterContentInit, ElementRef, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { YoutubePlayerService } from './youtube-player.service';

@Component({
  selector: 'yt-player',
  template: `
    <div id="yt-player-ng2-component" #ytPlayerContainer></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubePlayer implements OnInit, AfterContentInit {
  @Input() videoId: string = '';
  @Input() height: number;
  @Input() width: number;

  // player created and initialized - sends instance of the player
  @Output() ready = new EventEmitter<YT.Player>();
  // state change: send the YT event with its state
  @Output() change = new EventEmitter();

  @ViewChild('ytPlayerContainer') private ytPlayerContainer;

  constructor(
    public playerService: YoutubePlayerService,
    private elementRef: ElementRef
  ) {
  }

  ngAfterContentInit() {
    const htmlId = this.playerService.generateUniqueId();
    const playerSize = { height: this.height, width: this.width };
    this.ytPlayerContainer.nativeElement.setAttribute('id', htmlId);
    this.playerService.loadPlayerApi();
    this.playerService.setupPlayer(htmlId, {
      ready: this.ready,
      change: this.change
    }, playerSize);
  }

  ngOnInit() {
  }

  playVideo() {
    // this.playerService.play();
    // this.play.next(this.player.media);
  }

  pauseVideo() {
    // this.playerService.pause();
  }

  togglePlayer() {
    // this.playerService.togglePlayer();
  }

  playNextTrack() {
    // this.playNext.next(this.player);
  }
}
