import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgModel } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { PlayerSearch } from '../core/store/player-search';

import { PlayerSearch as PlayerSearchComponent } from './player-search.component'; 
import { YoutubeList } from '../core/components/youtube-list/youtube-list';

@Component({
  selector: 'youtube-videos.youtube-videos',
  template: require('./youtube-videos.html'),
  directives: [
    PlayerSearchComponent, 
    YoutubeList, 
    NgModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideos implements OnInit {
  videos$: Observable<GoogleApiYouTubeSearchResource[]>;
  playerSearch$: Observable<PlayerSearch>;

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    public store: Store<any>,
    public youtubePlayer: YoutubePlayerService) {
    this.videos$ = this.store.select(state => state.videos);
    this.playerSearch$ = this.store.select(state => state.search)
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
    this.queueSelectedVideo(media);
    this.nowPlaylistService.updateIndexByMedia(media);
  }

  queueSelectedVideo (media: GoogleApiYouTubeSearchResource) {
    this.nowPlaylistService.queueVideo(media.id.videoId);
  }

  resetPageToken() {
    this.youtubeSearch.resetPageToken();
  }
}