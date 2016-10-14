import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerSearchActions {
  static UPDATE_QUERY = '[PlayerSearch] UPDATE_QUERY';
  updateQuery(query: string): Action {
    return {
      type: PlayerSearchActions.UPDATE_QUERY,
      payload: query
    }
  }
  static UPDATE_FILTER = '[PlayerSearch] UPDATE_FILTER';
  updateFilter(): Action {
    return {
      type: PlayerSearchActions.UPDATE_FILTER
    }
  }
}
