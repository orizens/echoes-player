import {
  PlayerSearchActions,
  AddResultsAction,
  ActionTypes
} from './player-search.actions';
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
    duration: -1,
    preset: ''
  },
  queryParamsNew: {
    preset: '',
    videoType: 'any',
    videoDuration: 'any',
    videoDefinition: 'any'
  },
  presets: [
    // { label: 'Any', value: '' },
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
interface UnsafeAction {
  payload: any;
  type?: any;
}

export function search(
  state: IPlayerSearch = initialState,
  action: any
): IPlayerSearch {
  const { type, payload } = action;
  switch (type) {
    case PlayerSearchActions.UPDATE_QUERY: {
      return {
        ...state,
        query: payload
      };
    }

    case PlayerSearchActions.SEARCH_NEW_QUERY:
      return {
        ...state,
        query: payload || state.query,
        isSearching: true
      };

    case PlayerSearchActions.UPDATE_QUERY_PARAM: {
      const queryParams = { ...state.queryParams, ...payload };
      const queryParamsNew = { ...state.queryParamsNew, ...payload };
      return { ...state, queryParams, queryParamsNew };
    }

    case ActionTypes.UPDATE_QUERY_FILTER: {
      const { duration, hd } = payload;
      const newParams = {
        videoDuration: duration ? 'long' : 'any',
        videoDefinition: hd ? 'high' : 'any'
      };
      const queryParamsNew = { ...state.queryParams, ...newParams };
      return { ...state, queryParamsNew };
    }

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
