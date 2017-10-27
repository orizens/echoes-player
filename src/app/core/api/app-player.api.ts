import { Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { EchoesState } from '../store';
import * as AppPlayer from '../store/app-player';
import * as NowPlaylist from '../store/now-playlist';
import { NowPlaylistEffects } from '../effects/now-playlist.effects';

@Injectable()
export class AppPlayerApi {
  constructor(
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects,
    private nowPlaylistActions: NowPlaylist.NowPlaylistActions
  ) {}

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.nowPlaylistEffects.playPlaylistFirstTrack$
      .map(toPayload)
      .take(1)
      .subscribe((media: GoogleApiYouTubeVideoResource) => this.playVideo(media));
    this.queuePlaylist(playlist);
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.store.dispatch(new NowPlaylist.LoadPlaylistAction(playlist.id));
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new AppPlayer.LoadAndPlay(media));
    this.store.dispatch(new NowPlaylist.SelectVideo(media));
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new NowPlaylist.QueueVideo(media));
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new NowPlaylist.RemoveVideo(media));
  }
}
