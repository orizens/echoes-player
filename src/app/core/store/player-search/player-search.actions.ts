import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerSearchActions {
  static UPDATE_QUERY = '[PlayerSearch] UPDATE_QUERY';
  static UPDATE_FILTER = '[PlayerSearch] UPDATE_FILTER';

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
}
