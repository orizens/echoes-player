import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { toPayload } from '@utils/data.utils';

import { Injectable } from '@angular/core';
import { EchoesState } from '@store/reducers';
import * as AppPlayer from '@store/app-player';
import * as fromNowPlaylist from '@store/now-playlist';
import { NowPlaylistEffects } from '@core/effects/now-playlist.effects';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AppPlayerApi {
  constructor(
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects
  ) {}

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.nowPlaylistEffects.playPlaylistFirstTrack$
      .pipe(map(toPayload), take(1))
      .subscribe((media: GoogleApiYouTubeVideoResource) =>
        this.playVideo(media)
      );
    this.queuePlaylist(playlist);
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.store.dispatch(new fromNowPlaylist.LoadPlaylistAction(playlist.id));
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new AppPlayer.LoadAndPlay(media));
    this.store.dispatch(new fromNowPlaylist.SelectVideo(media));
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new fromNowPlaylist.QueueVideo(media));
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(new fromNowPlaylist.RemoveVideo(media));
  }

  pauseVideo() {
    this.store.dispatch(new AppPlayer.PauseVideo());
  }

  togglePlayer() {
    this.store.dispatch(new AppPlayer.TogglePlayer(true));
  }

  toggleFullScreen() {
    this.store.dispatch(new AppPlayer.FullScreen());
  }

  toggleRepeat() {
    this.store.dispatch(new fromNowPlaylist.ToggleRepeat());
  }

  resetPlayer() {
    this.store.dispatch(new AppPlayer.Reset());
  }

  setupPlayer(player) {
    this.store.dispatch(new AppPlayer.SetupPlayer(player));
  }

  changePlayerState(event: YT.OnStateChangeEvent) {
    this.store.dispatch(new AppPlayer.PlayerStateChange(event.data));
    this.store.dispatch(new fromNowPlaylist.PlayerStateChange(event.data));
  }
}
