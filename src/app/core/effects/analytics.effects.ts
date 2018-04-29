import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { UserProfileActions } from '@store/user-profile';
import * as PlayerSearch from '@store/player-search';
import { ActionTypes } from '@store/app-player';
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
  trackToken$ = this.actions$
    .ofType(UserProfileActions.USER_PROFILE_RECIEVED)
    .pipe(map(toPayload), tap(() => this.analytics.trackSignin()));

  @Effect({ dispatch: false })
  trackSearch$ = this.actions$
    .ofType(
      PlayerSearch.PlayerSearchActions.SEARCH_NEW_QUERY,
      PlayerSearch.PlayerSearchActions.SEARCH_MORE_FOR_QUERY
    )
    .pipe(
      map(toPayload),
      withLatestFrom(this.store.select(PlayerSearch.getSearchType)),
      tap((states: any[]) => this.analytics.trackSearch(states[1].presets))
    );

  @Effect({ dispatch: false })
  trackPlay$ = this.actions$
    .ofType(ActionTypes.PLAY_STARTED)
    .pipe(map(toPayload), tap(() => this.analytics.trackVideoPlay()));
}
