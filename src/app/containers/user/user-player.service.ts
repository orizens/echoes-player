import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  YoutubePlayerService,
  NowPlaylistService,
  UserProfile,
} from '../../core/services';
import { EchoesState } from '../../core/store';
import { NowPlaylistActions } from '../../core/store/now-playlist';
import { AppPlayerActions } from '../../core/store/app-player';

@Injectable()
export class UserPlayerService {

  constructor(
    private nowPlaylistService: NowPlaylistService,
    private userProfile: UserProfile,
    private playerActions: AppPlayerActions,
    private nowPlaylistActions: NowPlaylistActions,
    private store: Store<EchoesState>) { }

  playSelectedPlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfile.fetchPlaylistItems(playlist.id)
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        this.store.dispatch(this.nowPlaylistActions.queueVideos(items));
        this.nowPlaylistService.updateIndexByMedia(items[0].id);
        this.store.dispatch(this.playerActions.loadAndPlay(items[0]));
      });
  }

  queuePlaylist (playlist: GoogleApiYouTubePlaylistResource) {
    this.userProfile.fetchPlaylistItems(playlist.id)
      .subscribe((items: GoogleApiYouTubeVideoResource[]) => {
        this.store.dispatch(this.nowPlaylistActions.queueVideos(items));
        return items;
      });
  }

  queueVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }

  playVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.playerActions.loadAndPlay(media));
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
    this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }
}
