import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { EchoesState } from "../store";
import { PlayerActions } from "../store/youtube-player.actions";
import { YoutubePlayerService } from '../services/youtube-player.service';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class PlayerEffects {

  constructor(
    private store$: StateUpdates<EchoesState>,
    private playerActions: PlayerActions,
    private youtubePlayerService: YoutubePlayerService,
    private youtubeVideosInfo: YoutubeVideosInfo
  ){}

  @Effect() playVideo$ = this.store$
    .whenAction(PlayerActions.PLAY)
    .map<GoogleApiYouTubeSearchResource>(toPayload)
    .switchMap(media => Observable
      .of(this.youtubePlayerService.playVideo(media))
      .map(media => this.playerActions.playStarted(media))
    );

  @Effect() loadAndPlay$ = this.store$
    .whenAction(PlayerActions.LOAD_AND_PLAY)
    .map<GoogleApiYouTubeSearchResource>(toPayload)
    .switchMap(media => this.youtubeVideosInfo.fetchVideoData(media.id.videoId)
      .map(media => this.playerActions.playVideo(media))
    );
}
