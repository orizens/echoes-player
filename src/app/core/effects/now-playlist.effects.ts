import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { NowPlaylistActions } from '../store/now-playlist';

import { NowPlaylistService } from '../services/now-playlist.service';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
  ) {}

  @Effect()
  queueVideo$ = this.actions$
    .ofType(NowPlaylistActions.SELECT)
    .map(toPayload)
    .map((media: GoogleApiYouTubeVideoResource) => this.nowPlaylistActions.queueVideo(media));

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
