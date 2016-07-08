import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgModel } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store'; 

import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { PlayerSearch } from '../core/store/player-search';
import { EchoesVideos } from '../core/store/youtube-videos';

import { PlayerSearch as PlayerSearchComponent } from './player-search.component'; 
import { YoutubeList } from '../core/components/youtube-list/youtube-list';

@Component({
  selector: 'youtube-videos.youtube-videos',
  directives: [
    PlayerSearchComponent, 
    YoutubeList, 
    NgModel
  ],
  template: `
    <nav class="navbar col-md-12" player-resizer="fullscreen">
      <div class="navbar-header">
        <player-search 
          [query]="playerSearch$ | async"
          (change)="resetPageToken()"
          (search)="search($event)"
        ></player-search>
      </div>
      <div class="pull-right">
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </nav>
    <section class="videos-list">
      <youtube-list [list]="videos$ | async"
        (play)="playSelectedVideo($event)"
        (queue)="queueSelectedVideo($event)"
      ></youtube-list>
    </section>
  `
})
export class YoutubeVideos implements OnInit {
  videos$: Observable<EchoesVideos>;
  playerSearch$: Observable<PlayerSearch>;

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    public youtubePlayer: YoutubePlayerService) {
    this.videos$ = store.select(state => state.videos);
    this.playerSearch$ = store.select(state => state.search)
  }

  ngOnInit(){
    this.playerSearch$
      .take(1)
      .subscribe(ps => this.search(ps.query))
  }

  search (query: string) {
    if (query.length) {
      this.youtubeSearch.search(query, false);
    }
  }

  playSelectedVideo (media: GoogleApiYouTubeSearchResource) {
    this.youtubePlayer.playVideo(media);
    this.queueSelectedVideo(media)
      .then(videoResource => this.nowPlaylistService.updateIndexByMedia(videoResource));
  }

  queueSelectedVideo (media: GoogleApiYouTubeSearchResource) {
    return this.nowPlaylistService.queueVideo(media.id.videoId);
  }

  resetPageToken() {
    this.youtubeSearch.resetPageToken();
  }
}