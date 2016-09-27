import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
// import { NowPlaylistService } from '../core/services/now-playlist.service';
// import { YoutubeMediaPlaylist } from '../core/store/now-playlist';
import './navigator.less';

@Component({
	selector: 'navigator',
	template: `
  <ul id="library-nav" class="nav nav-list nicer-ux library-nav navigator" navigator>
    <li class="nav-header">Library</li>
		<li [ngClass]="{ active: isActive('explore') }"><a [routerLink]="['']"><i class="fa fa-music"></i>Explore</a></li>
		<li [ngClass]="{ active: isActive('user') }"><a [routerLink]="['user']"><i class="fa fa-heart"></i>My Playlists</a></li>
  </ul>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navigator implements OnInit {
	@Input() route: string;
	// @Output() select = new EventEmitter();
	// @Output() sort = new EventEmitter();
  private activeRoute: string = 'explore';

	constructor() { }

	ngOnInit(){}

	isActive (label: string) {
		return label === this.activeRoute;
	}
}

// <li [ngClass]="{ active: isActive('explore') }"><a [routerLink]="['']"><i class="fa fa-music"></i>Explore</a></li>
// <li [ngClass]="{ active: isActive('user') }"><a [routerLink]="['user']"><i class="fa fa-heart"></i>My Playlists</a></li>
