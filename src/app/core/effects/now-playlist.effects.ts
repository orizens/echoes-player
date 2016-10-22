import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { NowPlaylistActions } from '../store/now-playlist';

import { NowPlaylistService } from '../services/now-playlist.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class NowPlaylistEffects {
  // @Effect()
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

  constructor(
    private actions$: Actions,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) { }

}
