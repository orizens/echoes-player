import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { NowPlaylistService, UserProfile } from '../../core/services';
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
        // this.store.dispatch(new NowPlaylist.QueueVideos(items));
        this.nowPlaylistService.queueVideos(items);

        this.nowPlaylistService.updateIndexByMedia(items[0].id);

        // todo: add app player service
        this.store.dispatch(new AppPlayer.LoadAndPlay(items[0]));
      });
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfile
      .fetchPlaylistItems(playlist.id, '')
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        // this.store.dispatch(new NowPlaylist.QueueVideos(items));
        this.nowPlaylistService.queueVideos(items);

        return items;
      });
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new NowPlaylist.QueueVideo(media));
    this.nowPlaylistService.queueVideo2(media);
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    // todo: add app player service
    this.store.dispatch(new AppPlayer.LoadAndPlay(media));

    // todo: select triggers queue, why call it again?
    // this.store.dispatch(new NowPlaylist.QueueVideo(media));
    this.nowPlaylistService.queueVideo2(media);

    // this.store.dispatch(new NowPlaylist.SelectVideo(media));
    this.nowPlaylistService.selectVideo(media);
  }
}
