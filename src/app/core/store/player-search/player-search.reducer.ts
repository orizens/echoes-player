import { Action } from '@ngrx/store';
import { PlayerSearchActions } from './player-search.actions';

export interface PlayerSearch {
  query: string;
  filter: string;
  queryParams: {
    preset: string;
    duration: number;
  };
  pageToken: {
    next: string;
    prev: string;
  };
  isSearching: boolean;
  results: any[];
}

interface SearchQueryParam {
  [property: string]: any;
}

export interface PresetParam {
  label: string;
  value: any;
}
let initialState: PlayerSearch = {
  query: '',
  filter: '',
  queryParams: {
    preset: '',
    duration: -1
  },
  pageToken: {
    next: '',
    prev: ''
  },
  isSearching: false,
  results: []
};
export function search(state: PlayerSearch = initialState, action: Action): PlayerSearch {

  switch (action.type) {
    case PlayerSearchActions.SEARCH_NEW_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
        isSearching: true
      });

    case PlayerSearchActions.UPDATE_QUERY_PARAM:
      const queryParams = Object.assign({}, state.queryParams, action.payload);
      return Object.assign({}, state, { queryParams });

    case PlayerSearchActions.SEARCH_RESULTS_RETURNED:
      const { nextPageToken, prevPageToken } = action.payload;
      const statePageToken = state.pageToken;
      const pageToken = {
        next: nextPageToken || statePageToken.next,
        prev: prevPageToken || statePageToken.prev
      };
      return Object.assign({}, state, { pageToken });

    case PlayerSearchActions.SEARCH_STARTED:
      return Object.assign({}, state, { isSearching: true });

    case PlayerSearchActions.ADD_RESULTS:
      return Object.assign({}, state, {
        results: [...state.results, ...action.payload],
        isSearching: false
      });

    case PlayerSearchActions.RESET_RESULTS:
      return Object.assign({}, state, { results: [] });

    default:
      // upgrade policy - for when the initialState has changed
      return Object.assign({}, initialState, state);
  }
};

export const searchRegister = {
  reducer: { search },
  actions: PlayerSearchActions
};

export const getQuery = (state: PlayerSearch) => state.query;
export const getQueryParams = (state: PlayerSearch) => state.queryParams;
export const getQueryParamPreset = (state: PlayerSearch) => state.queryParams.preset;
