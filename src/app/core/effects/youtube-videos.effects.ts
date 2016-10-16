import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { YoutubeVideosActions } from "../store/youtube-videos";
import { YoutubeSearch } from "../services/youtube.search";
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class YoutubeVideosEffects {

  constructor(
    private actions$: Actions,
    private youtubeVideosActions: YoutubeVideosActions,
    private youtubeSearch: YoutubeSearch,
    private youtubeVideosInfo: YoutubeVideosInfo
  ){}

  @Effect() updateVideosMetadata$ = this.actions$
    .ofType(YoutubeVideosActions.ADD)
    .map(action => action.payload)
    .switchMap(medias => {
      return this.youtubeVideosInfo.fetchVideosData(medias.map(media => media.id.videoId).join(','))
      .map(medias => medias.map(media => this.youtubeVideosInfo.mediaToFriendlyDuration(media)))
      .map(medias => this.youtubeVideosActions.updateMetaData(medias))
    });
}
