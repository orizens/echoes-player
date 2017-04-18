import { EchoesState } from '../store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { NowPlaylistActions } from '../store/now-playlist';
import { getSelectedMediaId$, getPlaylistVideos$, isPlayerInRepeat$ } from '../store/now-playlist/now-playlist.selectors';

import { NowPlaylistService } from '../services/now-playlist.service';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
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
    .withLatestFrom(
      this.store.let(getSelectedMediaId$),
      this.store.let(getPlaylistVideos$),
      this.store.let(isPlayerInRepeat$)
    )
    .filter((states) => {
      const currentId = states[1];
      const mediaIds = states[2].map(video => video.id);
      const isRepeatOn = states[3];
      const lastIndexValue = mediaIds.length - 1;
      const isCurrentLast = mediaIds.indexOf(currentId) === lastIndexValue;
      return isRepeatOn || !isCurrentLast;
    })
    .map(states => {
      const currentId = states[1];
      const nextMedia = states[2].find(video => video.id === currentId);
      return this.nowPlaylistActions.selectVideo(nextMedia);
    });

  // queueVideoReady$ = this.actions$
    // .ofType(NowPlaylistActions.QUEUE_LOAD_VIDEO)
    // .map(action => action.payload)
    // .catch(video => Observable.of(this.nowPlaylistActions.queueFailed(video)));
    // .switchMap((media: GoogleApiYouTubeVideoResource) =>
    //   this.youtubeVideosInfo.fetchVideoData(media.id)
    //     .map(video => this.nowPlaylistActions.queueVideo(video))
    //     .catch(video => Observable.of(this.nowPlaylistActions.queueFailed(video)))

  // @Effect()
  // queueLoadVideoSuccess$ = this.actions$
  //   .ofType(NowPlaylistActions.QUEUE)
  //   .map(action => action.payload)
  //   .map(video => this.nowPlaylistActions.queueVideo(video));
    // .map((media: GoogleApiYouTubeVideoResource) => this.nowPlaylistActions.updateIndexByMedia(media.id));


}
