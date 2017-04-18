import { NowPlaylistService } from '../services';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { getSelectedMediaId$, getPlaylistVideos$, isPlayerInRepeat$ } from '../store/now-playlist/now-playlist.selectors';

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
    public youtubeVideosInfo: YoutubeVideosInfo,
    public nowPlaylistService: NowPlaylistService
  ) { }

  @Effect()
  playVideo$ = this.actions$
    .ofType(PlayerActions.PLAY)
    .map(toPayload)
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
