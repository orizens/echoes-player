import { YoutubeVideosInfo } from '@core/services';
import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as PlayerSearch from '@store/player-search';

import { YoutubeSearch } from '@core/services/youtube.search';

@Injectable()
export class PlayerSearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private playerSearchActions: PlayerSearch.PlayerSearchActions,
    private youtubeSearch: YoutubeSearch,
    private youtubeVideosInfo: YoutubeVideosInfo
  ) { }

  @Effect()
  searchQuery$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.SEARCH_NEW_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .switchMap((store: EchoesState) =>
      this.youtubeSearch.resetPageToken()
        .searchFor(store.search.searchType, store.search.query, store.search.queryParams)
        .map((youtubeResponse) => this.playerSearchActions.searchResultsReturned(youtubeResponse))
        .catch((err) => of(this.playerSearchActions.errorInSearch(err)))
    );

  @Effect()
  resetVideos$ = this.actions$
    .ofType(
    PlayerSearch.PlayerSearchActions.SEARCH_NEW_QUERY,
    PlayerSearch.PlayerSearchActions.PLAYLISTS_SEARCH_START.action
    )
    .map(() => this.playerSearchActions.resetResults());

  @Effect()
  searchResultsReturned$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.SEARCH_RESULTS_RETURNED)
    .map(toPayload)
    .withLatestFrom(this.store.select(PlayerSearch.getSearchType))
    .map((states: [any[], string]) => {
      if (states[1] === PlayerSearch.CSearchTypes.VIDEO) {
        return PlayerSearch.PlayerSearchActions.ADD_METADATA_TO_VIDEOS.creator(states[0]);
      }
      return PlayerSearch.PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.creator(states[0]);
    });

  @Effect()
  addPlaylistsToResults$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.action)
    .map(toPayload)
    .map((result) => PlayerSearch.AddResultsAction.creator(result.items));

  @Effect()
  addMetadataToVideos$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.ADD_METADATA_TO_VIDEOS.action)
    .map(toPayload)
    .map((medias: { items: GoogleApiYouTubeSearchResource[] }) => medias.items.map(media => media.id.videoId).join(','))
    .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds)
      .map((videos: any) => PlayerSearch.AddResultsAction.creator(videos)));

  @Effect()
  searchMoreForQuery$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .filter((store: EchoesState) => !store.search.isSearching)
    .mergeMap((store: EchoesState) => {
      this.youtubeSearch.searchMore(store.search.pageToken.next);
      return this.youtubeSearch.searchFor(
        store.search.searchType,
        store.search.query,
        store.search.queryParams,
      )
        .map(youtubeResponse => this.playerSearchActions.searchResultsReturned(youtubeResponse));
    });

  @Effect()
  searchMoreSearchStarted$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store.select(PlayerSearch.getIsSearching))
    .filter((states: [any, boolean]) => !states[1])
    .map(() => this.playerSearchActions.searchStarted());

  @Effect()
  updatePreset$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.UPDATE_QUERY_PARAM)
    .map(() => this.playerSearchActions.searchCurrentQuery());

  @Effect()
  resetVideosAfterParamUpdate$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.UPDATE_QUERY_PARAM)
    .map(() => this.playerSearchActions.resetResults());

  @Effect()
  resetPageToken$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.RESET_PAGE_TOKEN)
    .map(toPayload)
    .mergeMap(() => of(this.youtubeSearch.resetPageToken()))
    .map(() => ({ type: 'PAGE_RESET_DONE' }));

  @Effect()
  searchCurrentQuery$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.SEARCH_CURRENT_QUERY)
    .map(toPayload)
    .withLatestFrom(this.store.select(PlayerSearch.getQuery))
    .map((latest: any[]) => latest[1])
    .map((query: string) => this.playerSearchActions.searchNewQuery(query));

  // Playlists SEARCH EFFECTS
  @Effect()
  playlistsSearchStart$ = this.actions$
    .ofType(PlayerSearch.PlayerSearchActions.PLAYLISTS_SEARCH_START.action)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .switchMap((store: EchoesState) =>
      this.youtubeSearch.searchForPlaylist(store.search.query, store.search.queryParams)
        .map((youtubeResponse: any) =>
          PlayerSearch.AddResultsAction.creator(youtubeResponse.items)
        )
    ).catch((err) => of(this.playerSearchActions.errorInSearch(err)));
}
