import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CPresetTypes, CSearchTypes, IPlayerSearch } from '../store/player-search/player-search.interfaces';
import { YoutubeSearch } from './youtube.search';
import { YoutubeVideosInfo } from './youtube-videos-info.service';
import { Subscriber } from 'rxjs/Subscriber';

const INIT_STATE: IPlayerSearch = {
  query: '',
  filter: '',
  searchType: CSearchTypes.VIDEO,
  queryParams: {
    preset: '',
    duration: -1
  },
  presets: [
    { label: 'Any', value: '' },
    { label: 'Albums', value: CPresetTypes.FULL_ALBUMS },
    { label: 'Live', value: CPresetTypes.LIVE }
  ],
  pageToken: {
    next: '',
    prev: ''
  },
  isSearching: false,
  results: []
};


@Injectable()
export class PlayerSearchService {
  playerSearch$: Observable<IPlayerSearch>;

  private playerSearchSubject: BehaviorSubject<IPlayerSearch>;

  constructor(private youtubeSearch: YoutubeSearch, private youtubeVideosInfo: YoutubeVideosInfo) {
    this.playerSearchSubject = new BehaviorSubject(INIT_STATE);
    this.playerSearch$ = this.playerSearchSubject.asObservable();

  }

  updateSearchType(searchType: string) {
    this.playerSearchSubject.next({
      ...this.playerSearchSubject.getValue(),
      searchType: searchType
    });
  }

  searchCurrentQuery() {
    // @Effect()
    //   searchCurrentQuery$ = this.actions$
    //     .ofType(PlayerSearchActions.SEARCH_CURRENT_QUERY)
    //     .map(toPayload)
    //     .withLatestFrom(this.store)
    //     .map((latest: any[]) => latest[1])
    //     .map((store: EchoesState) => this.playerSearchActions.searchNewQuery(store.search.query));

    // then

    // case PlayerSearchActions.SEARCH_NEW_QUERY:
    //   return {
    //     ...state,
    //     query: action.payload,
    //     isSearching: true
    //   };

    // store emits new state:

    // const newState: IPlayerSearch = {
    //   query: '',
    //   filter: '',
    //   searchType: CSearchTypes.VIDEO,
    //   ...
    // };

    // triggers

    // @Effect()
    //   searchQuery$ = this.actions$
    //     .ofType(PlayerSearchActions.SEARCH_NEW_QUERY)
    //     .map(toPayload)
    //     .withLatestFrom(this.store)
    //     .map((latest: any[]) => latest[1])
    //     .switchMap((store: EchoesState) =>
    //       this.youtubeSearch.resetPageToken()
    //         .searchFor(store.search.searchType, store.search.query, store.search.queryParams)
    //         .map((youtubeResponse) => this.playerSearchActions.searchResultsReturned(youtubeResponse))
    //         .catch((err) => Observable.of(this.playerSearchActions.errorInSearch(err)))
    //     );

    // +++

    // @Effect()
    //   resetVideos$ = this.actions$
    //     .ofType(
    //       PlayerSearchActions.SEARCH_NEW_QUERY,
    //       PlayerSearchActions.PLAYLISTS_SEARCH_START.action
    //     )
    //     .map(() => this.playerSearchActions.resetResults());

    // which finishes first???
    // guess this.playerSearchActions.resetResults() ???

    // case PlayerSearchActions.RESET_RESULTS:
    //   return { ...state, results: [] };

    // store emits new state:

    // const newState: IPlayerSearch = {
    //   query: '',
    //   filter: '',
    //   searchType: CSearchTypes.VIDEO,
    //   results: any[];
    //   ...
    // };

    // then

    // case PlayerSearchActions.SEARCH_RESULTS_RETURNED:
    //   const { nextPageToken, prevPageToken } = action.payload;
    //   const statePageToken = state.pageToken;
    //   const pageToken = {
    //     next: nextPageToken || statePageToken.next,
    //     prev: prevPageToken || statePageToken.prev
    //   };
    //   return { ...state, pageToken };

    // store emits new state:

    // then

    // @Effect()
    //   searchResultsReturned$ = this.actions$
    //     .ofType(PlayerSearchActions.SEARCH_RESULTS_RETURNED)
    //     .map(toPayload)
    //     .withLatestFrom(this.store.let(getSearchType$))
    //     .map((states: [any[], string]) => {
    //       if (states[1] === CSearchTypes.VIDEO) {
    //         return PlayerSearchActions.ADD_METADATA_TO_VIDEOS.creator(states[0]);
    //       }
    //       return PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.creator(states[0]);
    //     });

    // then

    // static ADD_METADATA_TO_VIDEOS = {
    //     action: '[PlayerSearch] ADD_METADATA_TO_VIDEOS',
    //     creator: (payload) => ({ payload, type: PlayerSearchActions.ADD_METADATA_TO_VIDEOS.action })
    //   };

    // @Effect()
    //   addMetadataToVideos$ = this.actions$
    //     .ofType(PlayerSearchActions.ADD_METADATA_TO_VIDEOS.action)
    //     .map(toPayload)
    //     .map((medias: { items: GoogleApiYouTubeSearchResource[] }) => medias.items.map(media => media.id.videoId).join(','))
    //     .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds)
    //       .map((videos: GoogleApiYouTubeVideoResource[]) => this.playerSearchActions.addResults(videos)));

    // then

    // case PlayerSearchActions.ADD_RESULTS:
    //   return {
    //     ...state,
    //     results: [...state.results, ...action.payload],
    //     isSearching: false
    //   };

    // now becomes

    this.searchNewQuery(this.playerSearchSubject.getValue().query);
  }

  searchNewQuery(query: string) {
    let newPlayerSearch = { ...this.playerSearchSubject.getValue(), query: query, isSearching: true };
    this.playerSearchSubject.next(newPlayerSearch);

    newPlayerSearch = { ...newPlayerSearch, results: [] };
    this.playerSearchSubject.next(newPlayerSearch);

    if (newPlayerSearch.searchType === CSearchTypes.VIDEO) {

      this.youtubeSearch.resetPageToken()
        .searchFor(newPlayerSearch.searchType, newPlayerSearch.query, newPlayerSearch.queryParams)
        .do((youtubeResponse) => {
          const { nextPageToken, prevPageToken } = youtubeResponse;
          const statePageToken = newPlayerSearch.pageToken;
          const pageToken = {
            next: nextPageToken || statePageToken.next,
            prev: prevPageToken || statePageToken.prev
          };

          newPlayerSearch = { ...newPlayerSearch, pageToken };
          this.playerSearchSubject.next(newPlayerSearch);
        })
        .map((medias: { items: GoogleApiYouTubeSearchResource[] }) => medias.items.map(media => media.id.videoId).join(','))
        .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds))
        .subscribe(this.createAddVideosHandler());
      // .catch((err) => Observable.of(this.playerSearchActions.errorInSearch(err)))
    } else {
      this.youtubeSearch.searchMore(newPlayerSearch.pageToken.next)
        .searchFor(
          newPlayerSearch.searchType,
          newPlayerSearch.query,
          newPlayerSearch.queryParams,
        )
        .do(youtubeResponse => {
          const { nextPageToken, prevPageToken } = youtubeResponse;
          const statePageToken = newPlayerSearch.pageToken;
          const pageToken = {
            next: nextPageToken || statePageToken.next,
            prev: prevPageToken || statePageToken.prev
          };

          this.playerSearchSubject.next({ ...newPlayerSearch, pageToken });
        })
        .map(result => result.items)
        .subscribe(this.createAddVideosHandler());
    }
  }

  resetPageToken() {
    // @Effect()
    //   resetPageToken$ = this.actions$
    //     .ofType(PlayerSearchActions.RESET_PAGE_TOKEN)
    //     .map(toPayload)
    //     .mergeMap(() => Observable.of(this.youtubeSearch.resetPageToken()))
    //     .map(() => ({ type: 'PAGE_RESET_DONE' }));
    this.youtubeSearch.resetPageToken();
  }

  updateQueryAction(query: string) {
    this.playerSearchSubject.next({
      ...this.playerSearchSubject.getValue(), query
    });
  }

  searchMoreForQuery() {
    // @Effect()
    //   searchMoreForQuery$ = this.actions$
    //     .ofType(PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    //     .map(toPayload)
    //     .withLatestFrom(this.store)
    //     .map((latest: any[]) => latest[1])
    //     .filter((store: EchoesState) => !store.search.isSearching)
    //     .mergeMap((store: EchoesState) => {
    //       this.youtubeSearch.searchMore(store.search.pageToken.next);
    //       return this.youtubeSearch.searchFor(
    //         store.search.searchType,
    //         store.search.query,
    //         store.search.queryParams,
    //       )
    //         .map(youtubeResponse => this.playerSearchActions.searchResultsReturned(youtubeResponse));
    //     });

    const search = this.playerSearchSubject.getValue();
    if (!search.isSearching) {
      this.playerSearchSubject.next({ ...search, isSearching: true });

      if (search.searchType === CSearchTypes.VIDEO) {
        this.youtubeSearch.searchMore(search.pageToken.next)
          .searchFor(
            search.searchType,
            search.query,
            search.queryParams,
          )
          .do(youtubeResponse => {
            const { nextPageToken, prevPageToken } = youtubeResponse;
            const statePageToken = search.pageToken;
            const pageToken = {
              next: nextPageToken || statePageToken.next,
              prev: prevPageToken || statePageToken.prev
            };

            this.playerSearchSubject.next({ ...search, pageToken });
          })
          .map((medias: { items: GoogleApiYouTubeSearchResource[] }) => medias.items.map(media => media.id.videoId).join(','))
          .mergeMap((mediaIds: string) => this.youtubeVideosInfo.fetchVideosData(mediaIds))
          .subscribe(this.createAddVideosHandler());
      } else {
        this.youtubeSearch.searchMore(search.pageToken.next)
          .searchFor(
            search.searchType,
            search.query,
            search.queryParams,
          )
          .do(youtubeResponse => {
            const { nextPageToken, prevPageToken } = youtubeResponse;
            const statePageToken = search.pageToken;
            const pageToken = {
              next: nextPageToken || statePageToken.next,
              prev: prevPageToken || statePageToken.prev
            };

            this.playerSearchSubject.next({ ...search, pageToken });
          })
          .map(result => result.items)
          .subscribe(this.createAddVideosHandler());
      }

    }
  }

  updateQueryParam(param) {
    const search = this.playerSearchSubject.getValue();
    const queryParams = { ...search.queryParams, ...param };

    const newSearch = {
      ...search,
      queryParams,
      results: []
    };

    this.playerSearchSubject.next(newSearch);
    this.searchCurrentQuery();
  }

  private createAddVideosHandler() {
    return Subscriber.create((videos: GoogleApiYouTubeVideoResource[]) => {
      const state = this.playerSearchSubject.getValue();
      const newState = {
        ...this.playerSearchSubject.getValue(),
        results: [...state.results, ...videos],
        isSearching: false
      };

      this.playerSearchSubject.next(newState);
    });
  }
}
