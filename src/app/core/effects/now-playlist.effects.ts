import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMapTo';
import { of } from 'rxjs/observable/of';
import { MediaParserService, YoutubePlayerService } from '../services';
import { NowPlaylistService } from '../services/now-playlist.service';
import { EchoesState } from '../store';
import { NowPlaylistActions } from '../store/now-playlist';
import { NowPlaylistInterface } from '../store/now-playlist/now-playlist.reducer';
import {
  getPlaylistVideos$,
  getSelectedMedia$,
  getSelectedMediaId$,
  isPlayerInRepeat$,
  getNowPlaylist$
} from '../store/now-playlist/now-playlist.selectors';


@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    public store: Store<EchoesState>,
    private nowPlaylistActions: NowPlaylistActions,
    private nowPlaylistService: NowPlaylistService,
    private mediaParser: MediaParserService,
    private playerService: YoutubePlayerService
  ) {}

  @Effect()
  queueVideo$ = this.actions$
    .ofType(NowPlaylistActions.SELECT)
    .map(toPayload)
    .map((media: GoogleApiYouTubeVideoResource) => this.nowPlaylistActions.queueVideo(media));

  /* if it's the last track
   * AND repeat is on
   * THEN play the first track
  **/
  @Effect()
  loadNextTrack$ = this.actions$
    .ofType(NowPlaylistActions.MEDIA_ENDED)
    .map(toPayload)
    .withLatestFrom(this.store.let(getNowPlaylist$))
    .map(([action, nowPlaylist]: [any, NowPlaylistInterface]) => {
      let videoId = nowPlaylist.selectedId;
      if ( nowPlaylist.shuffle && nowPlaylist.videos.length > 1 ) {
        while ( videoId === nowPlaylist.selectedId) {
          videoId = nowPlaylist.videos[this.getRandomInt(0, nowPlaylist.videos.length - 1)].id;
        }
      }
      const mediaIds = nowPlaylist.videos.map(video => video.id);
      const selectedMediaIndex = mediaIds.indexOf(videoId);
      return nowPlaylist.videos[selectedMediaIndex];
    })
    .filter((video: GoogleApiYouTubeVideoResource) => video && !!video.id)
    .map((video: GoogleApiYouTubeVideoResource) => this.nowPlaylistActions.selectVideo(video))
    .share();

  @Effect()
  selectBeforeSeekToTime$ = this.actions$
    .ofType(NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    .map(toPayload)
    .map((trackEvent) => this.nowPlaylistActions.updateIndexByMedia(trackEvent.media.id));

  @Effect({ dispatch: false })
  seekToTime$ = this.actions$
    .ofType(NowPlaylistActions.SELECT_AND_SEEK_TO_TIME)
    .map(toPayload)
    .do((trackEvent) => this.playerService.seekTo(this.mediaParser.toNumber(trackEvent.time)))
    .catch((error) => of({ type: 'ERROR_IN_SEEK', payload: error }));


  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
