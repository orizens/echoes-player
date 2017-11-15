import { Store } from '@ngrx/store';
import { toPayload } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { EchoesState } from '../store';
import * as AppPlayer from '../store/app-player';
import { NowPlaylistEffects } from '../effects/now-playlist.effects';
import { NowPlaylistService } from '../services/now-playlist.service';
import { UserProfile } from '../services/user-profile.service';
import { AppPlayerService } from '../services/app-player.service';
import { YoutubeApiService } from '../services/youtube-api.service';

@Injectable()
export class AppPlayerApi {
  constructor(
    private store: Store<EchoesState>,
    private nowPlaylistEffects: NowPlaylistEffects,
    private nowPlaylistService: NowPlaylistService,
    private appPlayerService: AppPlayerService,
    private youtubeApiService: YoutubeApiService
  ) {}

  playPlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    this.nowPlaylistEffects.playPlaylistFirstTrack$
      .map(toPayload)
      .take(1)
      .subscribe((media: GoogleApiYouTubeVideoResource) => this.playVideo(media));
    this.queuePlaylist(playlist);
  }

  queuePlaylist(playlist: GoogleApiYouTubePlaylistResource) {
    // todo: move to now play list service?

    // this.store.dispatch(new NowPlaylist.LoadPlaylistAction(playlist.id));

    // @Effect()
    //   loadPlaylist$ = this.actions$
    //     .ofType(NowPlaylist.NowPlaylistActions.LOAD_PLAYLIST_START)
    //     .map(toPayload)
    //     .switchMap((id: string) => this.userProfile.fetchAllPlaylistItems(id))
    //     // .mergeMap((playlistId: string) => this.loadPlaylistItems$(playlistId))
    //     // .switchMap((playlistId: string) => this.userProfile.fetchAllPlaylistItems(playlistId))
    //     // .switchMap((playlistItems: GoogleApiYouTubePlaylistItemResource[]) => this.userProfile.fetchMetadata(playlistItems))
    //     .map(
    //       (playlistItems: GoogleApiYouTubeVideoResource[]) => new NowPlaylist.LoadPlaylistEndAction(playlistItems)
    //     );

    this.youtubeApiService.fetchAllPlaylistItems(playlist.id).subscribe((playlistItems: GoogleApiYouTubeVideoResource[]) => {
      this.nowPlaylistService.queueVideos(playlistItems);
      this.nowPlaylistService.selectVideo(playlistItems[0]);
    });
  }

  playVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new AppPlayer.LoadAndPlay(media));
    this.appPlayerService.loadAndPlay(media);

    // this.store.dispatch(new NowPlaylist.SelectVideo(media));
    this.nowPlaylistService.selectVideo(media);
  }

  queueVideo(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new NowPlaylist.QueueVideo(media));
    this.nowPlaylistService.queueVideo2(media);
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    // this.store.dispatch(new NowPlaylist.RemoveVideo(media));
    this.nowPlaylistService.removeVideo(media);
  }
}
