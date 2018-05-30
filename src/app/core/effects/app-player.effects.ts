import { NowPlaylistService } from '@core/services';
import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { toPayload } from '@utils/data.utils';

import { of, Observable, defer } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  withLatestFrom,
  catchError
} from 'rxjs/operators';

import * as AppPlayer from '@store/app-player';
import { YoutubePlayerService } from '@core/services/youtube-player.service';
import { YoutubeVideosInfo } from '@core/services/youtube-videos-info.service';

@Injectable()
export class AppPlayerEffects {
  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public youtubePlayerService: YoutubePlayerService,
    public youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect() init$ = defer(() => of(new AppPlayer.ResetFullScreen()));

  @Effect()
  playVideo$ = this.actions$
    .ofType(AppPlayer.ActionTypes.PLAY)
    .pipe(
      map(toPayload),
      switchMap(media =>
        of(this.youtubePlayerService.playVideo(media)).pipe(
          map((video: any) => new AppPlayer.PlayStarted(video))
        )
      )
    );

  @Effect({ dispatch: false })
  pauseVideo$ = this.actions$
    .ofType(AppPlayer.ActionTypes.PAUSE)
    .pipe(tap(() => this.youtubePlayerService.pause()));

  @Effect()
  loadAndPlay$ = this.actions$
    .ofType(AppPlayer.ActionTypes.LOAD_AND_PLAY)
    .pipe(
      map(toPayload),
      switchMap((media: any) =>
        this.youtubeVideosInfo
          .fetchVideoData(media.id || media.id.videoId)
          .pipe(map((video: any) => new AppPlayer.PlayVideo(video)))
      ),
      catchError(() => of({ type: 'LOAD_AND_PLAY_ERROR' }))
    );

  @Effect({ dispatch: false })
  toggleFullscreen$ = this.actions$
    .ofType(AppPlayer.ActionTypes.FULLSCREEN)
    .pipe(
      withLatestFrom(this.store.select(AppPlayer.getPlayerFullscreen)),
      tap((states: [any, { on; height; width }]) =>
        this.youtubePlayerService.setSize(states[1].height, states[1].width)
      )
    );

  @Effect({ dispatch: false })
  setupPlayer$ = this.actions$
    .ofType(AppPlayer.ActionTypes.SETUP_PLAYER)
    .pipe(
      map(toPayload),
      tap(player => this.youtubePlayerService.setupPlayer(player))
    );

  @Effect()
  playerStateChange$ = this.actions$
    .ofType(AppPlayer.ActionTypes.PLAYER_STATE_CHANGE)
    .pipe(
      map(toPayload),
      map((data: YT.PlayerState) => new AppPlayer.UpdateState(data))
    );
}
