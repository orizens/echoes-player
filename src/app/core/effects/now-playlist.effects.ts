import { MediaParserService, YoutubePlayerService } from '../services';
import { EchoesState } from '../store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/withLatestFrom';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as NowPlaylist from '../store/now-playlist';
import {
  getSelectedMedia$,
  getSelectedMediaId$,
  getPlaylistVideos$,
  isPlayerInRepeat$
} from '../store/now-playlist/now-playlist.selectors';

import { UserProfile } from '../services/user-profile.service';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylist.NowPlaylistActions,
    private mediaParser: MediaParserService,
    private playerService: YoutubePlayerService,
    private userProfile: UserProfile
  ) {}

  @Effect()
  queueVideo$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.SELECT)
    .map(toPayload)
    .map((media: GoogleApiYouTubeVideoResource) => new NowPlaylist.QueueVideo(media));

  /* if it's the last track
   * AND repeat is on
   * THEN play the first track
  **/
  @Effect()
  loadNextTrack$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.MEDIA_ENDED)
    .map(toPayload)
    .withLatestFrom(this.store.let(getSelectedMedia$))
    .filter((states: [any, GoogleApiYouTubeVideoResource]) => states[1] && states[1].hasOwnProperty('id'))
    .map((states: [any, GoogleApiYouTubeVideoResource]) => new NowPlaylist.SelectVideo(states[1]));

  @Effect()
  selectBeforeSeekToTime$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    .map(toPayload)
    .map(trackEvent => new NowPlaylist.UpdateIndexByMedia(trackEvent.media.id));

  @Effect({ dispatch: false })
  seekToTime$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    .map(toPayload)
    .do(trackEvent => this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time)));
  // .catch((error) => of({ type: 'ERROR_IN_SEEK', payload: error }));

  @Effect()
  loadPlaylist$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.LOAD_PLAYLIST_START)
    .map(toPayload)
    .switchMap((id: string) => this.userProfile.fetchAllPlaylistItems(id))
    // .mergeMap((playlistId: string) => this.loadPlaylistItems$(playlistId))
    // .switchMap((playlistId: string) => this.userProfile.fetchAllPlaylistItems(playlistId))
    // .switchMap((playlistItems: GoogleApiYouTubePlaylistItemResource[]) => this.userProfile.fetchMetadata(playlistItems))
    .map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) => new NowPlaylist.LoadPlaylistEndAction(playlistItems)
    );

  @Effect()
  addPlaylistItems$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.LOAD_PLAYLIST_END)
    .map(toPayload)
    .map((playlistItems: GoogleApiYouTubeVideoResource[]) => new NowPlaylist.QueueVideos(playlistItems));

  @Effect()
  playPlaylistFirstTrack$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.LOAD_PLAYLIST_END)
    .map(toPayload)
    .map((playlistItems: GoogleApiYouTubeVideoResource[]) => new NowPlaylist.SelectVideo(playlistItems[0]));

  @Effect()
  playPlaylist$ = this.actions$
    .ofType(NowPlaylist.NowPlaylistActions.PLAY_PLAYLIST)
    .map(toPayload)
    .map((id: string) => new NowPlaylist.LoadPlaylistAction(id));
  // .map(queue the playlist
  // .map(play the first track from this playlist)

  // loadPlaylistItems$(playlistId: string) {
  //   return of(playlistId)
  //     .switchMap((id: string) => this.userProfile.fetchAllPlaylistItems(id))
  //     .switchMap((playlistItems: GoogleApiYouTubeVideoResource[]) => this.userProfile.fetchMetadata(playlistItems));
  // }
}
