import { ActionReducer, Action } from '@ngrx/store';
import { PlayerSearchActions } from './player-search.actions';

export interface PlayerSearch {
  query: string;
  filter: string;
  queryParams: {
    preset: string;
    duration: number;
  };
}
interface SearchQueryParam {
  [property: string]: any;
}
let initialState: PlayerSearch = {
  query: '',
  filter: '',
  queryParams: {
    preset: '',
    duration: -1
  }
};
export const search: ActionReducer<PlayerSearch> = (
  state: PlayerSearch = initialState,
  action: Action) => {

  switch (action.type) {
    case PlayerSearchActions.UPDATE_QUERY:
      return Object.assign({}, state, { query: action.payload });

    case PlayerSearchActions.UPDATE_FILTER:
      return state;

    case PlayerSearchActions.UPDATE_QUERY_PARAM:
      const queryParams = Object.assign({}, state.queryParams, action.payload);
      return Object.assign({}, state, { queryParams });

    default:
      // upgrade policy - for when the initialState has changed
      return Object.assign({}, initialState, state);
  }
};
