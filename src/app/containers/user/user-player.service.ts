import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { YoutubePlayerService, NowPlaylistService, UserProfile } from '../../core/services';
import { EchoesState } from '../../core/store';
import * as NowPlaylist from '../../core/store/now-playlist';
import * as AppPlayer from '../../core/store/app-player';

@Injectable()
export class UserPlayerService {
  constructor(
    private nowPlaylistService: NowPlaylistService,
    private userProfile: UserProfile,
    private store: Store<EchoesState>
  ) {}

  playSelectedPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfile
      .fetchPlaylistItems(playlist.id, '')
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        this.store.dispatch(new NowPlaylist.QueueVideos(items));
        this.nowPlaylistService.updateIndexByMedia(items[0].id);
        this.store.dispatch(new AppPlayer.LoadAndPlay(items[0]));
      });
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfile
      .fetchPlaylistItems(playlist.id, '')
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        this.store.dispatch(new NowPlaylist.QueueVideos(items));
        return items;
      });
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new NowPlaylist.QueueVideo(media));
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new AppPlayer.LoadAndPlay(media));
    this.store.dispatch(new NowPlaylist.QueueVideo(media));
    this.store.dispatch(new NowPlaylist.SelectVideo(media));
  }
}
