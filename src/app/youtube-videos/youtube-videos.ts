import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store,  } from '@ngrx/store';
// import { NgClass } from '@angular/common';
import { YoutubeSearch } from '../core/services/youtube.search';
import { YoutubePlayerService } from '../core/services/youtube-player.service';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { YoutubeList } from '../core/components/youtube-list/youtube-list';
import { PlayerSearch } from '../core/store/player-search';

@Component({
  selector: 'youtube-videos.youtube-videos',
  template: require('./youtube-videos.html'),
  directives: [YoutubeList, NgModel],
  providers: [  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideos implements OnDestroy {
  videos: Observable<GoogleApiYouTubeSearchResource[]>;
  searchQuery: string = '';
  playerSearch: Subscription;

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    public store: Store<any>,
    public youtubePlayer: YoutubePlayerService) {
  }

  ngOnInit(){
    this.videos = this.store.select(state => state.videos);
    this.playerSearch = this.store
      .select(state => state.search)
      .subscribe(state => this.searchQuery = state.query);
    this.search();
  }

  ngOnDestroy () {
    this.playerSearch.unsubscribe();
  }

  search () {
    this.youtubeSearch.search(this.searchQuery, false);
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