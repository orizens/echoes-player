import { getSearchType$ } from '../store/player-search/player-search.selectors';
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
import { PlayerSearchActions, CSearchTypes } from '../store/player-search';

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
      .searchFor(store.search.searchType, store.search.query, store.search.queryParams)
      .map((youtubeResponse) => this.playerSearchActions.searchResultsReturned(youtubeResponse))
      .catch((err) => Observable.of(this.playerSearchActions.errorInSearch(err)))
    );

  @Effect()
  resetVideos$ = this.actions$
    .ofType(
      PlayerSearchActions.SEARCH_NEW_QUERY,
      PlayerSearchActions.PLAYLISTS_SEARCH_START.action
    )
    .map(() => this.playerSearchActions.resetResults());

  @Effect()
  searchResultsReturned$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_RESULTS_RETURNED)
    .map(toPayload)
    .withLatestFrom(this.store.let(getSearchType$))
    .map((states: [any[], string]) => {
      if (states[1] === CSearchTypes.VIDEO) {
        return PlayerSearchActions.ADD_METADATA_TO_VIDEOS.creator(states[0]);
      }
      return PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.creator(states[0]);
    });

  @Effect()
  addPlaylistsToResults$ = this.actions$
    .ofType(PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.action)
    .map(toPayload)
    .map((result) => this.playerSearchActions.addResults(result.items));

  @Effect()
  addMetadataToVideos$ = this.actions$
    .ofType(PlayerSearchActions.ADD_METADATA_TO_VIDEOS.action)
    .map(toPayload)
    .map((medias: { items: GoogleApiYouTubeSearchResource[] }) => medias.items.map(media => media.id.videoId).join(','))
    .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds)
      .map((videos: GoogleApiYouTubeVideoResource[]) => this.playerSearchActions.addResults(videos)));

  @Effect()
  searchMoreForQuery$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
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

  // Playlists SEARCH EFFECTS
  @Effect()
  playlistsSearchStart$ = this.actions$
    .ofType(PlayerSearchActions.PLAYLISTS_SEARCH_START.action)
    .withLatestFrom(this.store)
    .map((latest: any[]) => latest[1])
    .switchMap((store: EchoesState) =>
      this.youtubeSearch.searchForPlaylist(store.search.query, store.search.queryParams)
      .map((youtubeResponse) => {
        return this.playerSearchActions.addResults(youtubeResponse.items);
      })
    ).catch((err) => Observable.of(this.playerSearchActions.errorInSearch(err)));
}
