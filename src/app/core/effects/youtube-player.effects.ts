import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { getSelectedMediaId$, getPlaylistVideos$ } from '../store/now-playlist/now-playlist.selectors';

import { PlayerActions } from '../store/youtube-player';
import { YoutubePlayerService } from '../services/youtube-player.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class PlayerEffects {

  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public playerActions: PlayerActions,
    public youtubePlayerService: YoutubePlayerService,
    public youtubeVideosInfo: YoutubeVideosInfo
  ) { }

  @Effect()
  playVideo$ = this.actions$
    .ofType(PlayerActions.PLAY)
    .map(toPayload)
    .withLatestFrom(this.store.let(getSelectedMediaId$), this.store.let(getPlaylistVideos$))
    .filter((states) => {
      const nextId = states[0].id;
      const mediaIds = states[2].map(video => video.id);
      const isSelectedMediaLast = mediaIds.lastIndexOf(nextId) === mediaIds.length - 1;
      return !isSelectedMediaLast;
    })
    .map(states => states[0])
    .switchMap(media => Observable
      .of(this.youtubePlayerService.playVideo(media))
      .map(video => this.playerActions.playStarted(video))
    );

  @Effect()
  loadAndPlay$ = this.actions$
    .ofType(PlayerActions.LOAD_AND_PLAY)
    .map(toPayload)
    .switchMap((media: any) => this.youtubeVideosInfo.fetchVideoData(media.id || media.id.videoId)
      .map(video => this.playerActions.playVideo(video))
    );
}
