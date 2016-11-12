import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerSearchActions {
  static UPDATE_QUERY = '[PlayerSearch] UPDATE_QUERY';
  static UPDATE_FILTER = '[PlayerSearch] UPDATE_FILTER';
  static UPDATE_QUERY_PARAM = '[PlayerSearch] UPDATE_QUERY_PARAM';
  static SEARCH_NEW_QUERY = '[PlayerSearch] SEARCH_NEW_QUERY';

  updateQuery(query: string): Action {
    return {
      type: PlayerSearchActions.UPDATE_QUERY,
      payload: query
    };
  }

  updateFilter(): Action {
    return {
      type: PlayerSearchActions.UPDATE_FILTER
    };
  }

  updateQueryParam(queryParam: any) {
    return {
      type: PlayerSearchActions.UPDATE_QUERY_PARAM,
      payload: queryParam
    };
  }

  searchNewQuery() {
    return {
      type: PlayerSearchActions.SEARCH_NEW_QUERY
      // payload: { query, params }
    };
  }
}
