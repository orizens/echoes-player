import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { EchoesState } from '../store';
import { AppPlayerActions } from '../store/app-player';
import * as PlaylistStore from '../store/now-playlist';

@Injectable()
export class AppPlayerApi {

  constructor(
    private store: Store<EchoesState>,
    private appPlayerActions: AppPlayerActions,
    private nowPlaylistActions: PlaylistStore.NowPlaylistActions
  ) { }

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.store.dispatch(new PlaylistStore.PlayPlaylistAction(playlist.id));
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.store.dispatch(new PlaylistStore.LoadPlaylistAction(playlist.id));
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.appPlayerActions.loadAndPlay(media));
    this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.removeVideo(media));
  }
}
