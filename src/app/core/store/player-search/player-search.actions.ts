import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class PlayerSearchActions {
  // @ActionCreator({
  //   type: 'UPDATE_FILTER',
  //   payload: string
  // })
  // @ActionCreator<string>(PlayerSearchActions.UPDATE_FILTER)
  // update;
  static UPDATE_FILTER = '[PlayerSearch] UPDATE_FILTER';
  static UPDATE_QUERY_PARAM = '[PlayerSearch] UPDATE_QUERY_PARAM';
  static SEARCH_NEW_QUERY = '[PlayerSearch] SEARCH_NEW_QUERY';
  static SEARCH_MORE_FOR_QUERY = '[PlayerSearch] SEARCH_MORE_FOR_QUERY';
  static GET_SUGGESTIONS = '[PlayerSearch] GET_SUGGESTIONS';
  static RESET_PAGE_TOKEN = '[PlayerSearch] RESET_PAGE_TOKEN';
  static SEARCH_RESULTS_RETURNED = '[PlayerSearch] SERACH_RESULTS_RETURNED';
  static SEARCH_CURRENT_QUERY = '[PlayerSearch] SEARCH_CURRENT_QUERY';
  static SEARCH_STARTED = '[PlayerSearch] SEARCH_STARTED';

  // Results Actions
  static ADD_RESULTS = '[PlayerSearch] ADD_RESULTS';
  static RESET_RESULTS = '[PlayerSearch] RESET_RESULTS';
  static ERROR_RESULTS = '[PlayerSearch] ERROR_RESULTS';

  getSuggestions = ActionCreatorFactory.create<string>(PlayerSearchActions.GET_SUGGESTIONS);
  searchCurrentQuery = ActionCreatorFactory.create(PlayerSearchActions.SEARCH_CURRENT_QUERY);
  searchNewQuery = ActionCreatorFactory.create<string>(PlayerSearchActions.SEARCH_NEW_QUERY);
  searchMoreForQuery = ActionCreatorFactory.create(PlayerSearchActions.SEARCH_MORE_FOR_QUERY);
  updateFilter = ActionCreatorFactory.create(PlayerSearchActions.UPDATE_FILTER);
  updateQueryParam = ActionCreatorFactory.create<any>(PlayerSearchActions.UPDATE_QUERY_PARAM);
  resetPageToken = ActionCreatorFactory.create<any>(PlayerSearchActions.RESET_PAGE_TOKEN);
  searchResultsReturned = ActionCreatorFactory.create<any>(PlayerSearchActions.SEARCH_RESULTS_RETURNED);
  searchStarted = ActionCreatorFactory.create(PlayerSearchActions.SEARCH_STARTED);
  addResults = ActionCreatorFactory.create(PlayerSearchActions.ADD_RESULTS);
  resetResults = ActionCreatorFactory.create(PlayerSearchActions.RESET_RESULTS);
  errorInSearch = ActionCreatorFactory.create<any>(PlayerSearchActions.ERROR_RESULTS);
}
