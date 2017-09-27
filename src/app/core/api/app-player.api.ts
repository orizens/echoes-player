import { Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { EchoesState } from '../store';
import { AppPlayerActions } from '../store/app-player';
import * as PlaylistStore from '../store/now-playlist';
import { NowPlaylistEffects } from '../effects/now-playlist.effects';

@Injectable()
export class AppPlayerApi {

  constructor(
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects,
    private appPlayerActions: AppPlayerActions,
    private nowPlaylistActions: PlaylistStore.NowPlaylistActions
  ) { }

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.nowPlaylistEffects.playPlaylistFirstTrack$
      .map(toPayload)
      .take(1)
      .subscribe((media: GoogleApiYouTubeVideoResource) => this.playVideo(media));
    this.queuePlaylist(playlist);
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
