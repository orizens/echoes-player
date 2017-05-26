import { Action } from '@ngrx/store';
import { PlayerSearchActions } from './player-search.actions';

export interface IQueryParam {
    preset: string;
    duration: number;
}
export interface IPlayerSearch {
  query: string;
  filter: string;
  searchType: string;
  queryParams: IQueryParam;
  pageToken: {
    next: string;
    prev: string;
  };
  isSearching: boolean;
  results: any[];
}
export const SearchTypes = {
  VIDEO: 'video',
  PLAYLIST: 'playlist'
};

interface ISearchQueryParam {
  [property: string]: any;
}

export interface IPresetParam {
  label: string;
  value: any;
}
const initialState: IPlayerSearch = {
  query: '',
  filter: '',
  searchType: SearchTypes.VIDEO,
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
export function search(state: IPlayerSearch = initialState, action: Action): IPlayerSearch {

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

    case PlayerSearchActions.SEARCH_TYPE_UPDATE: {
      return {
        ...state,
        searchType: action.payload
      };
    }

    default:
      // upgrade policy - for when the initialState has changed
      return Object.assign({}, initialState, state);
  }
};

export const searchRegister = {
  reducer: { search },
  actions: PlayerSearchActions
};
