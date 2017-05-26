import { Observable } from 'rxjs/Observable';
import { IPlayerSearch, IQueryParam } from './player-search.reducer';
import { EchoesState } from '../reducers';

export function getPlayerSearch$ (state$: Observable<EchoesState>): Observable<IPlayerSearch> {
  return state$.select(state => state.search);
};

export function getQuery$(state$: Observable<EchoesState>): Observable<string> {
  return state$.select(state => state.search.query);
}

export function getQueryParams$(state$: Observable<EchoesState>): Observable<IQueryParam> {
  return state$.select(state => state.search.queryParams);
}

export function getQueryParamPreset$(state$: Observable<EchoesState>): Observable<string> {
  return state$.select(state => state.search.queryParams.preset);
}

export function getSearchType$(state$: Observable<EchoesState>) {
  return state$.select(state => state.search.searchType);
}
