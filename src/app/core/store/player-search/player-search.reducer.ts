import { Action } from '@ngrx/store';
import { PlayerSearchActions, AddResultsAction } from './player-search.actions';
import {
  IPlayerSearch,
  CSearchTypes,
  CPresetTypes
} from './player-search.interfaces';

export * from './player-search.interfaces';

const initialState: IPlayerSearch = {
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
interface UnsafeAction extends Action {
  payload: any;
}

export function search(
  state: IPlayerSearch = initialState,
  action: UnsafeAction
): IPlayerSearch {
  switch (action.type) {
    case PlayerSearchActions.UPDATE_QUERY: {
      return { ...state, query: action.payload };
    }

    case PlayerSearchActions.SEARCH_NEW_QUERY:
      return {
        ...state,
        query: action.payload,
        isSearching: true
      };

    case PlayerSearchActions.UPDATE_QUERY_PARAM:
      const queryParams = { ...state.queryParams, ...action.payload };
      return { ...state, queryParams };

    case PlayerSearchActions.SEARCH_RESULTS_RETURNED:
      const { nextPageToken, prevPageToken } = action.payload;
      const statePageToken = state.pageToken;
      const pageToken = {
        next: nextPageToken || statePageToken.next,
        prev: prevPageToken || statePageToken.prev
      };
      return { ...state, pageToken };

    case PlayerSearchActions.SEARCH_STARTED:
      return { ...state, isSearching: true };

    case AddResultsAction.type:
      return AddResultsAction.handler(state, action.payload);

    case PlayerSearchActions.RESET_RESULTS:
      return { ...state, results: [] };

    case PlayerSearchActions.SEARCH_TYPE_UPDATE: {
      return {
        ...state,
        searchType: action.payload
      };
    }
    case PlayerSearchActions.PLAYLISTS_SEARCH_START.action: {
      return { ...state, isSearching: true };
    }

    default:
      // upgrade policy - for when the initialState has changed
      return { ...initialState, ...state };
  }
}
