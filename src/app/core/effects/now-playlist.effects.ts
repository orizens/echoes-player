import { MediaParserService, YoutubePlayerService } from '@core/services';
import { EchoesState } from '@store/reducers';
import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromNowPlaylist from '@store/now-playlist';
import { UserProfile } from '@core/services/user-profile.service';
import { toPayload } from '@utils/data.utils';
import { map, switchMap, withLatestFrom, filter, tap } from 'rxjs/operators';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<EchoesState>,
    private mediaParser: MediaParserService,
    private playerService: YoutubePlayerService,
    private userProfile: UserProfile
  ) {}

  @Effect()
  queueVideo$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.SELECT),
    map(toPayload),
    map(
      (media: GoogleApiYouTubeVideoResource) =>
        new fromNowPlaylist.QueueVideo(media)
    )
  );

  @Effect()
  playerStateChange$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.PLAYER_STATE_CHANGE),
    map(toPayload),
    filter((data: YT.PlayerState) => data === YT.PlayerState.ENDED),
    map(() => new fromNowPlaylist.MediaEnded())
  );

  /* if it's the last track
   * AND repeat is on
   * THEN play the first track
  **/
  @Effect()
  loadNextTrack$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.MEDIA_ENDED),
    map(toPayload),
    withLatestFrom(this.store.select(fromNowPlaylist.getSelectedMedia)),
    filter(
      (states: [any, GoogleApiYouTubeVideoResource]) =>
        states[1] && states[1].hasOwnProperty('id')
    ),
    map(
      (states: [any, GoogleApiYouTubeVideoResource]) =>
        new fromNowPlaylist.SelectVideo(states[1])
    )
  );

  @Effect()
  selectBeforeSeekToTime$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.SELECT_AND_SEEK_TO_TIME),
    map(toPayload),
    map(
      trackEvent => new fromNowPlaylist.UpdateIndexByMedia(trackEvent.media.id)
    )
  );

  @Effect({ dispatch: false })
  seekToTime$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.SELECT_AND_SEEK_TO_TIME),
    map(toPayload),
    tap(trackEvent =>
      this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time))
    )
  );

  @Effect()
  loadPlaylist$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.LOAD_PLAYLIST_START),
    map(toPayload),
    switchMap((id: string) => this.userProfile.fetchAllPlaylistItems(id)),
    map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new fromNowPlaylist.LoadPlaylistEndAction(playlistItems)
    )
  );

  @Effect()
  addPlaylistItems$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.LOAD_PLAYLIST_END),
    map(toPayload),
    map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new fromNowPlaylist.QueueVideos(playlistItems)
    )
  );

  @Effect()
  playPlaylistFirstTrack$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.LOAD_PLAYLIST_END),
    map(toPayload),
    map(
      (playlistItems: GoogleApiYouTubeVideoResource[]) =>
        new fromNowPlaylist.SelectVideo(playlistItems[0])
    )
  );

  @Effect()
  playPlaylist$ = this.actions$.pipe(
    ofType(fromNowPlaylist.ActionTypes.PLAY_PLAYLIST),
    map(toPayload),
    map((id: string) => new fromNowPlaylist.LoadPlaylistAction(id))
  );
}
