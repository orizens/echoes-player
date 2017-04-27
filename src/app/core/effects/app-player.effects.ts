import { getPlayerFullscreen$ } from '../store/app-player/app-player.selectors';
import { NowPlaylistService } from '../services';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AppPlayerActions } from '../store/app-player';
import { YoutubePlayerService } from '../services/youtube-player.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class AppPlayerEffects {

  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public appPlayerActions: AppPlayerActions,
    public youtubePlayerService: YoutubePlayerService,
    public youtubeVideosInfo: YoutubeVideosInfo,
    public nowPlaylistService: NowPlaylistService
  ) { }

  @Effect()
  playVideo$ = this.actions$
    .ofType(AppPlayerActions.PLAY)
    .map(toPayload)
    .switchMap(media => Observable
      .of(this.youtubePlayerService.playVideo(media))
      .map(video => this.appPlayerActions.playStarted(video))
    );

  @Effect()
  loadAndPlay$ = this.actions$
    .ofType(AppPlayerActions.LOAD_AND_PLAY)
    .map(toPayload)
    .switchMap((media: any) => this.youtubeVideosInfo.fetchVideoData(media.id || media.id.videoId)
      .map(video => this.appPlayerActions.playVideo(video))
    );

  @Effect({ dispatch: false })
  toggleFullscreen$ = this.actions$
    .ofType(AppPlayerActions.FULLSCREEN)
    .withLatestFrom(this.store.let(getPlayerFullscreen$))
    .do((states: [ any, {on, height, width} ]) => this.youtubePlayerService.setSize(states[1].height, states[1].width));
}
