import { ActionReducer, Action } from '@ngrx/store';
import { PlayerSearchActions } from './player-search.actions';

export interface PlayerSearch {
  query: string;
  filter: string;
}
let initialState: PlayerSearch = {
  query: '',
  filter: ''
};
export const search: ActionReducer<PlayerSearch> = (
  state: PlayerSearch = initialState,
  action: Action) => {

  switch (action.type) {
    case PlayerSearchActions.UPDATE_QUERY:
      return Object.assign({}, state, { query: action.payload });

    case PlayerSearchActions.UPDATE_FILTER:
      return state;

    default:
      return state;
  }
};
