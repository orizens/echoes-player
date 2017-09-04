import { Observable } from 'rxjs/Observable';
import { IPlayerSearch, IQueryParam } from './player-search.reducer';
import { EchoesState } from '../reducers';

export function getPlayerSearch$ (state$: Observable<EchoesState>): Observable<IPlayerSearch> {
  return state$.select(state => state.search);
}

export function getQuery$(state$: Observable<EchoesState>): Observable<string> {
  return getPlayerSearch$(state$).select(state => state.query);
}

export function getQueryParams$(state$: Observable<EchoesState>): Observable<IQueryParam> {
  return getPlayerSearch$(state$).select(state => state.queryParams);
}

export function getQueryParamPreset$(state$: Observable<EchoesState>): Observable<string> {
  return getPlayerSearch$(state$).select(state => state.queryParams.preset);
}

export function getSearchType$(state$: Observable<EchoesState>) {
  return getPlayerSearch$(state$).select(state => state.searchType);
}

export function getIsSearching$(state$: Observable<EchoesState>) {
  return getPlayerSearch$(state$).select(state => state.isSearching);
}

export function getPresets$(state$: Observable<EchoesState>) {
  return getPlayerSearch$(state$).select(state => state.presets);
}
