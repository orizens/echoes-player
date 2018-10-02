import { YoutubeVideosInfo } from '@core/services';
import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';
import { Observable ,  of } from 'rxjs';

import {
  map,
  switchMap,
  filter,
  withLatestFrom,
  mergeAll,
  catchError,
  mergeMap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as fromPlayerSearch from '@store/player-search';
import { toPayload } from '@utils/data.utils';

import { YoutubeSearch } from '@core/services/youtube.search';

@Injectable()
export class PlayerSearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private playerSearchActions: fromPlayerSearch.PlayerSearchActions,
    private youtubeSearch: YoutubeSearch,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) {}

  @Effect()
  searchQuery$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.SEARCH_NEW_QUERY)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store),
      map((latest: any[]) => latest[1]),
      switchMap((store: EchoesState) =>
        this.youtubeSearch
          .resetPageToken()
          .searchFor(
            store.search.searchType,
            store.search.query,
            store.search.queryParams
          )
          .pipe(
            map(youtubeResponse =>
              this.playerSearchActions.searchResultsReturned(youtubeResponse)
            ),
            catchError(err => of(this.playerSearchActions.errorInSearch(err)))
          )
      )
    );

  @Effect()
  resetVideos$ = this.actions$
    .ofType(
      fromPlayerSearch.PlayerSearchActions.SEARCH_NEW_QUERY,
      fromPlayerSearch.PlayerSearchActions.PLAYLISTS_SEARCH_START.action
    )
    .pipe(map(() => this.playerSearchActions.resetResults()));

  @Effect()
  searchResultsReturned$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.SEARCH_RESULTS_RETURNED)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store.select(fromPlayerSearch.getSearchType)),
      map((states: [any[], string]) => {
        if (states[1] === fromPlayerSearch.CSearchTypes.VIDEO) {
          return fromPlayerSearch.PlayerSearchActions.ADD_METADATA_TO_VIDEOS.creator(
            states[0]
          );
        }
        return fromPlayerSearch.PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.creator(
          states[0]
        );
      })
    );

  @Effect()
  addPlaylistsToResults$ = this.actions$
    .ofType(
      fromPlayerSearch.PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.action
    )
    .pipe(
      map(toPayload),
      map(result => fromPlayerSearch.AddResultsAction.creator(result.items))
    );

  @Effect()
  addMetadataToVideos$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.ADD_METADATA_TO_VIDEOS.action)
    .pipe(
      map(toPayload),
      map((medias: { items: GoogleApiYouTubeSearchResource[] }) =>
        medias.items.map(media => media.id.videoId).join(',')
      ),
      mergeMap((mediaIds: string) =>
        this.youtubeVideosInfo
          .fetchVideosData(mediaIds)
          .pipe(
            map((videos: any) =>
              fromPlayerSearch.AddResultsAction.creator(videos)
            )
          )
      )
    );

  @Effect()
  searchMoreForQuery$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store),
      map((latest: any[]) => latest[1]),
      filter((store: EchoesState) => !store.search.isSearching),
      mergeMap((store: EchoesState) => {
        this.youtubeSearch.searchMore(store.search.pageToken.next);
        return this.youtubeSearch
          .searchFor(
            store.search.searchType,
            store.search.query,
            store.search.queryParams
          )
          .pipe(
            map(youtubeResponse =>
              this.playerSearchActions.searchResultsReturned(youtubeResponse)
            )
          );
      })
    );

  @Effect()
  searchMoreSearchStarted$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store.select(fromPlayerSearch.getIsSearching)),
      filter((states: [any, boolean]) => !states[1]),
      map(() => this.playerSearchActions.searchStarted())
    );

  @Effect()
  updatePreset$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.UPDATE_QUERY_PARAM)
    .pipe(map(() => new fromPlayerSearch.SearchCurrentQuery()));

  @Effect()
  resetVideosAfterParamUpdate$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.UPDATE_QUERY_PARAM)
    .pipe(map(() => this.playerSearchActions.resetResults()));

  @Effect()
  resetPageToken$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.RESET_PAGE_TOKEN)
    .pipe(
      map(toPayload),
      mergeMap(() => of(this.youtubeSearch.resetPageToken())),
      map(() => ({ type: 'PAGE_RESET_DONE' }))
    );

  @Effect()
  searchCurrentQuery$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.SEARCH_CURRENT_QUERY)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store.select(fromPlayerSearch.getQuery)),
      map((latest: any[]) => latest[1]),
      map((query: string) => this.playerSearchActions.searchNewQuery(query))
    );

  // Playlists SEARCH EFFECTS
  @Effect()
  playlistsSearchStart$ = this.actions$
    .ofType(fromPlayerSearch.PlayerSearchActions.PLAYLISTS_SEARCH_START.action)
    .pipe(
      withLatestFrom(this.store),
      map((latest: any[]) => latest[1]),
      switchMap((store: EchoesState) =>
        this.youtubeSearch
          .searchForPlaylist(store.search.query, store.search.queryParams)
          .pipe(
            map((youtubeResponse: any) =>
              fromPlayerSearch.AddResultsAction.creator(youtubeResponse.items)
            ),
            catchError(err => of(this.playerSearchActions.errorInSearch(err)))
          )
      )
    );
}
