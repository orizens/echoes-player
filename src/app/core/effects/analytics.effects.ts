import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserProfileActions } from '@store/user-profile';
import * as PlayerSearch from '@store/player-search';
import { ActionTypes } from '@store/app-player';
import * as AppCore from '@store/app-core';

import { AnalyticsService } from '@core/services/analytics.service';
import { EchoesState } from '@store/reducers';
import { toPayload } from '@utils/data.utils';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AnalyticsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<EchoesState>,
    private userProfileActions: UserProfileActions,
    private analytics: AnalyticsService
  ) {}

  @Effect({ dispatch: false })
  trackToken$ = this.actions$.pipe(
    ofType(UserProfileActions.USER_PROFILE_RECIEVED),
    map(toPayload),
    tap(() => this.analytics.trackSignin())
  );

  @Effect({ dispatch: false })
  trackSearch$ = this.actions$.pipe(
    ofType(
      PlayerSearch.PlayerSearchActions.SEARCH_NEW_QUERY,
      PlayerSearch.PlayerSearchActions.SEARCH_MORE_FOR_QUERY
    ),
    map(toPayload),
    withLatestFrom(this.store.select(PlayerSearch.getSearchType)),
    tap((states: any[]) => this.analytics.trackSearch(states[1].presets))
  );

  @Effect({ dispatch: false })
  trackPlay$ = this.actions$.pipe(
    ofType(ActionTypes.PLAY_STARTED),
    map(toPayload),
    tap(() => this.analytics.trackVideoPlay())
  );
  
  @Effect({ dispatch: false })
  appError$ = this.actions$.pipe(
    ofType(AppCore.ActionTypes.ERROR_ADD),
    map(toPayload),
    tap((error) => this.analytics.trackError(error?.message || error))
  );
}
