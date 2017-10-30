import { getPlayerFullscreen$ } from '../store/app-player/app-player.selectors';
import { NowPlaylistService } from '../services';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';

import * as AppPlayer from '../store/app-player';
import { YoutubePlayerService } from '../services/youtube-player.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

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
    .map(toPayload)
    .switchMap(media =>
      of(this.youtubePlayerService.playVideo(media)).map((video: any) => new AppPlayer.PlayStarted(video))
    );

  @Effect()
  loadAndPlay$ = this.actions$
    .ofType(AppPlayer.ActionTypes.LOAD_AND_PLAY)
    .map(toPayload)
    .switchMap((media: any) =>
      this.youtubeVideosInfo
        .fetchVideoData(media.id || media.id.videoId)
        .map((video: any) => new AppPlayer.PlayVideo(video))
    );

  @Effect({ dispatch: false })
  toggleFullscreen$ = this.actions$
    .ofType(AppPlayer.ActionTypes.FULLSCREEN)
    .withLatestFrom(this.store.let(getPlayerFullscreen$))
    .do((states: [any, { on; height; width }]) =>
      this.youtubePlayerService.setSize(states[1].height, states[1].width)
    );
}
