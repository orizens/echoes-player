import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { PlayerActions } from '../store/youtube-player';
import { YoutubePlayerService } from '../services/youtube-player.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class PlayerEffects {

  constructor(
    public actions$: Actions,
    public playerActions: PlayerActions,
    public youtubePlayerService: YoutubePlayerService,
    public youtubeVideosInfo: YoutubeVideosInfo
  ) { }

  @Effect()
  playVideo$ = this.actions$
    .ofType(PlayerActions.PLAY)
    .map(action => action.payload)
    .switchMap(media => Observable
      .of(this.youtubePlayerService.playVideo(media))
      .map(video => this.playerActions.playStarted(video))
    );

  @Effect()
  loadAndPlay$ = this.actions$
    .ofType(PlayerActions.LOAD_AND_PLAY)
    .map(action => action.payload)
    .switchMap((media: any) => this.youtubeVideosInfo.fetchVideoData(media.id || media.id.videoId)
      .map(video => this.playerActions.playVideo(video))
    );
}
