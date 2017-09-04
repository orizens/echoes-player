import { Action } from '@ngrx/store';
import { PlayerSearchActions } from './player-search.actions';
import { IPlayerSearch, CSearchTypes, CPresetTypes } from './player-search.interfaces';

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
    case PlayerSearchActions.PLAYLISTS_SEARCH_START.action: {
      return { ...state, isSearching: true };
    }

    default:
      // upgrade policy - for when the initialState has changed
      return Object.assign({}, initialState, state);
  }
}

export const searchRegister = {
  reducer: { search },
  actions: PlayerSearchActions
};
