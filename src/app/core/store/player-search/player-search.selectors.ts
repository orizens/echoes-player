import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPlayerSearch, IQueryParam } from './player-search.reducer';
import { EchoesState } from '@store/reducers';

export const getPlayerSearch = (state: EchoesState) => state.search;
export const getPlayerSearchResults = createSelector(getPlayerSearch, (search: IPlayerSearch) => search.results);
export const getQuery = createSelector(getPlayerSearch, (search: IPlayerSearch) => search.query);
export const getQueryParams = createSelector(getPlayerSearch, (search: IPlayerSearch) => search.queryParams);
export const getQueryParamPreset = createSelector(
  getPlayerSearch,
  getQueryParams,
  (search: IPlayerSearch, queryParams: IQueryParam) => queryParams.preset
);
export const getSearchType = createSelector(getPlayerSearch, (search: IPlayerSearch) => search.searchType);
export const getIsSearching = createSelector(getPlayerSearch, (search: IPlayerSearch) => search.isSearching);
export const getPresets = createSelector(getPlayerSearch, (search: IPlayerSearch) => search.presets);
