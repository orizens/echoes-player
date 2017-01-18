import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { YoutubeVideosActions } from '../store/youtube-videos';
import { YoutubeSearch } from '../services/youtube.search';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class YoutubeVideosEffects {

  constructor(
    public actions$: Actions,
    public youtubeVideosActions: YoutubeVideosActions,
    public youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect()
  updateVideosMetadata$ = this.actions$
    .ofType(YoutubeVideosActions.ADD_FOR_PROCESSING)
    .map(action => action.payload)
    .map((medias: GoogleApiYouTubeSearchResource[]) => medias.map(media => media.id.videoId).join(','))
    .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds)
      .map((videos: GoogleApiYouTubeVideoResource[]) =>
        this.youtubeVideosActions.addVideos(videos))
    )
    .catch(error => Observable.of({ type: 'ERROR_IN_FETCH', payload: error }));

  // @Effect()
  // endSearch$ = this.actions$
  //   .ofType(YoutubeVideosActions.ADD)
  //   .map(action => action.payload)
  //   .map(videos => this.youtubeVideosActions.searchStarted(false));
}
