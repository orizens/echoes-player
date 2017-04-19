import { YoutubeVideosInfo } from '../services';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { PlayerSearchActions } from '../store/player-search';

import { YoutubeSearch } from '../services/youtube.search';

@Injectable()
export class PlayerSearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private playerSearchActions: PlayerSearchActions,
    private youtubeSearch: YoutubeSearch,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) { }

  @Effect()
  searchQuery$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_NEW_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .switchMap((store: EchoesState) =>
      this.youtubeSearch.resetPageToken()
      .search(store.search.query, store.search.queryParams)
      .map((youtubeResponse) => this.playerSearchActions.searchResultsReturned(youtubeResponse))
      .catch((err) => Observable.of(this.playerSearchActions.errorInSearch(err)))
    );

  @Effect()
  resetVideos$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_NEW_QUERY)
    .map(() => this.playerSearchActions.resetResults());

  @Effect()
  searchResultsReturned$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_RESULTS_RETURNED)
    .map(toPayload)
    .map((medias: { items: GoogleApiYouTubeSearchResource[] }) => medias.items.map(media => media.id.videoId).join(','))
    .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds)
      .map((videos: GoogleApiYouTubeVideoResource[]) =>
        this.playerSearchActions.addResults(videos))
      );
    // .map((youtubeResponse) => this.youtubeVideosActions.addForProcessing(youtubeResponse.items));

  @Effect()
  searchMoreForQuery$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: EchoesState) => !store.search.isSearching)
    .mergeMap((store: EchoesState) =>
      this.youtubeSearch.searchMore(store.search.pageToken.next)
      .search(store.search.query, store.search.queryParams)
      .map(youtubeResponse => this.playerSearchActions.searchResultsReturned(youtubeResponse)));

  @Effect()
  searchMoreSearchStarted$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: EchoesState) => !store.search.isSearching)
    .map(() => this.playerSearchActions.searchStarted());

  @Effect()
  updatePreset$ = this.actions$
    .ofType(PlayerSearchActions.UPDATE_QUERY_PARAM)
    .map(() => this.playerSearchActions.searchCurrentQuery());

  @Effect()
  resetVideosAfterParamUpdate$ = this.actions$
    .ofType(PlayerSearchActions.UPDATE_QUERY_PARAM)
    .map(() => this.playerSearchActions.resetResults());

  @Effect()
  resetPageToken$ = this.actions$
    .ofType(PlayerSearchActions.RESET_PAGE_TOKEN)
    .map(toPayload)
    .mergeMap(() => Observable.of(this.youtubeSearch.resetPageToken()))
    .map(() => ({ type: 'PAGE_RESET_DONE' }));

  @Effect()
  searchCurrentQuery$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_CURRENT_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .map((store: EchoesState) => this.playerSearchActions.searchNewQuery(store.search.query));
}
