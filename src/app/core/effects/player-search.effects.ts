import { YoutubeVideosActions } from '../store/youtube-videos/youtube-videos.actions';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { PlayerSearch, PlayerSearchActions } from '../store/player-search';

import { YoutubeSearch } from '../services/youtube.search';

@Injectable()
export class PlayerSearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private playerSearchActions: PlayerSearchActions,
    private youtubeVideosActions: YoutubeVideosActions,
    private youtubeSearch: YoutubeSearch
  ) { }

  @Effect()
  searchQuery$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_NEW_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .switchMap((store: EchoesState) => {
      this.youtubeSearch.resetPageToken();
      return this.youtubeSearch.search(store.search.query, store.search.queryParams)
        .map((youtubeResponse) =>
          this.playerSearchActions.searchResultsReturned(youtubeResponse))
    });

  @Effect()
  resetVideos$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_NEW_QUERY)
    .map(() => this.youtubeVideosActions.reset());

  @Effect()
  searchResultsReturned$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_RESULTS_RETURNED)
    .map(toPayload)
    .map((youtubeResponse) => this.youtubeVideosActions.addForProcessing(youtubeResponse.items));

  @Effect()
  searchMoreForQuery$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: EchoesState) => !store.search.isSearching)
    .mergeMap((store: EchoesState) => {
      this.youtubeSearch.searchMore();
      return this.youtubeSearch.search('', store.search.queryParams)
        .map(youtubeResponse => this.playerSearchActions.searchResultsReturned(youtubeResponse));
    });

  @Effect()
  searchMoreSearchStarted$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .map(() => this.playerSearchActions.searchStarted());

  @Effect()
  updatePreset$ = this.actions$
    .ofType(PlayerSearchActions.UPDATE_QUERY_PARAM)
    .map(() => this.playerSearchActions.searchCurrentQuery());

  @Effect()
  resetVideosAfterParamUpdate$ = this.actions$
    .ofType(PlayerSearchActions.UPDATE_QUERY_PARAM)
    .map(() => this.youtubeVideosActions.reset());

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
