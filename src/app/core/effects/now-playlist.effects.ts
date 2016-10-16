import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { NowPlaylistActions } from "../store/now-playlist";

import { NowPlaylistService } from '../services/now-playlist.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class NowPlaylistEffects {

  constructor(
    private actions$: Actions,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
    private youtubeVideosInfo: YoutubeVideosInfo
  ){}

  @Effect() queueVideoReady$ = this.actions$
    .ofType(NowPlaylistActions.QUEUE_LOAD_VIDEO)
    .map(action => action.payload)
    .switchMap((media: GoogleApiYouTubeVideoResource) => this.youtubeVideosInfo.fetchVideoData(media.id)
      .map(media => this.nowPlaylistActions.queueVideo(media))
      .catch(() => Observable.of(this.nowPlaylistActions.queueFailed(media)))
    );

  @Effect() queueLoadVideoSuccess$ = this.actions$
    .ofType(NowPlaylistActions.QUEUE_LOAD_VIDEO_SUCCESS)
    .map(action => action.payload)
    .map(media => this.nowPlaylistActions.updateIndexByMedia(media));
}
