import { MediaParserService, YoutubePlayerService } from '../services';
import { EchoesState } from '../store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMapTo';
import { of } from 'rxjs/observable/of';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { NowPlaylistActions } from '../store/now-playlist';
import { getSelectedMedia$,getSelectedMediaId$, getPlaylistVideos$, isPlayerInRepeat$ } from '../store/now-playlist/now-playlist.selectors';

import { NowPlaylistService } from '../services/now-playlist.service';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
    private mediaParser: MediaParserService,
    private playerService: YoutubePlayerService
  ) {}

  @Effect()
  queueVideo$ = this.actions$
    .ofType(NowPlaylistActions.SELECT)
    .map(toPayload)
    .map((media: GoogleApiYouTubeVideoResource) => this.nowPlaylistActions.queueVideo(media));

  /* if it's the last track
   * AND repeat is on
   * THEN play the first track
  **/
  @Effect()
  loadNextTrack$ = this.actions$
    .ofType(NowPlaylistActions.MEDIA_ENDED)
    .map(toPayload)
    .withLatestFrom(this.store.let(getSelectedMedia$))
    .filter((states: [any, GoogleApiYouTubeVideoResource]) => states[1] && states[1].hasOwnProperty('id'))
    .map((states: [any, GoogleApiYouTubeVideoResource]) => {
      return this.nowPlaylistActions.selectVideo(states[1]);
    }).share();

  @Effect()
  selectBeforeSeekToTime$ = this.actions$
    .ofType(NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    .map(toPayload)
    .map((trackEvent) => this.nowPlaylistActions.updateIndexByMedia(trackEvent.media.id));

  @Effect({ dispatch: false })
  seekToTime$ = this.actions$
    .ofType(NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    .map(toPayload)
    .do((trackEvent) => this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time)))
    .catch((error) => of({ type: 'ERROR_IN_SEEK', payload: error }));
}
