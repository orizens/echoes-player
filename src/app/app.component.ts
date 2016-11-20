import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import 'rxjs/add/operator/let';
// SERVICES
import { YoutubeSearch, YoutubePlayerService, NowPlaylistService } from './core/services';

import { EchoesState, getSidebarCollapsed } from './core/store';
import { YoutubePlayerState, PlayerActions } from './core/store/youtube-player';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { YoutubeMediaPlaylist } from './core/store/now-playlist';
import { AppLayout, AppLayoutActions } from './core/store/app-layout';
// import { Notify } from '@ngrx/notify';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <player class="navbar navbar-default navbar-fixed-bottom"></player>

    <div id="sidebar" class="sidebar sidebar-left-fixed ux-maker"
      [class.closed]="sidebarCollapsed$ | async">
      <nav class="navbar navbar-transparent">
        <app-brand></app-brand>
        <navigator></navigator>
      </nav>
      <now-playing></now-playing>
    </div>

    <div class="container-fluid container-main">
      <router-outlet></router-outlet>
    </div>
  `
})
export class App implements OnInit {
  sidebarCollapsed$: Observable<boolean>;

  constructor(
    private store: Store<EchoesState>
  ) {
  }

  ngOnInit() {
    this.sidebarCollapsed$ = this.store.let(getSidebarCollapsed);
  }
}
