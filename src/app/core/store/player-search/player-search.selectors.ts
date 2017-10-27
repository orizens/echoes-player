import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IPlayerSearch, IQueryParam } from './player-search.reducer';
import { EchoesState } from '../reducers';

export function getPlayerSearch$(state$: Store<EchoesState>): Store<IPlayerSearch> {
  return state$.select(state => state.search);
}

export function getQuery$(state$: Store<EchoesState>): Observable<string> {
  return getPlayerSearch$(state$).select(state => state.query);
}

export function getQueryParams$(state$: Store<EchoesState>): Observable<IQueryParam> {
  return getPlayerSearch$(state$).select(state => state.queryParams);
}

export function getQueryParamPreset$(state$: Store<EchoesState>): Observable<string> {
  return getPlayerSearch$(state$).select(state => state.queryParams.preset);
}

export function getSearchType$(state$: Store<EchoesState>) {
  return getPlayerSearch$(state$).select(state => state.searchType);
}

export function getIsSearching$(state$: Store<EchoesState>) {
  return getPlayerSearch$(state$).select(state => state.isSearching);
}

export function getPresets$(state$: Store<EchoesState>) {
  return getPlayerSearch$(state$).select(state => state.presets);
}
