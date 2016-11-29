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
    public youtubeSearch: YoutubeSearch,
    public youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect()
  updateVideosMetadata$ = this.actions$
    .ofType(YoutubeVideosActions.ADD)
    .map(action => action.payload)
    .map((medias: GoogleApiYouTubeSearchResource[]) => medias.map(media => media.id.videoId).join(','))
    .switchMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds)
      // .map((videos: GoogleApiYouTubeVideoResource[]) =>
      //   videos.map(video => this.youtubeVideosInfo.mediaToFriendlyDuration(video)))
      .map((videos: GoogleApiYouTubeVideoResource[]) =>
        this.youtubeVideosActions.updateMetaData(videos))
    );
}
