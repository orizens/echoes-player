import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { EchoesState } from "../store";
import { NowPlaylistActions } from "../store/now-playlist.actions";

import { NowPlaylistService } from '../services/now-playlist.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class NowPlaylistEffects {

  constructor(
    private store$: StateUpdates<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
    private youtubeVideosInfo: YoutubeVideosInfo
  ){}

  @Effect() queueVideoReady$ = this.store$
    .whenAction(NowPlaylistActions.QUEUE_LOAD_VIDEO)
    .map<GoogleApiYouTubeSearchResource>(toPayload)
    .switchMap(media => this.youtubeVideosInfo.fetchVideoData(media.id.videoId)
      .map(media => this.nowPlaylistActions.queueVideo(media))
      .catch(() => Observable.of(this.nowPlaylistActions.queueFailed(media)))
    );

  @Effect() queueLoadVideoSuccess$ = this.store$
    .whenAction(NowPlaylistActions.QUEUE_LOAD_VIDEO_SUCCESS)
    .map<any>(toPayload)
    .map(media => {
      console.log('', media)
      return this.nowPlaylistActions.updateIndexByMedia(media)
    });
}
