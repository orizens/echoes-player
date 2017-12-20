import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { UserProfileActions } from '../store/user-profile';
import { PlayerSearchActions } from '../store/player-search';
import { ActionTypes } from '../store/app-player';
import { AnalyticsService } from '../services/analytics.service';

@Injectable()
export class AnalyticsEffects {
  constructor(
    private actions$: Actions,
    private userProfileActions: UserProfileActions,
    private analytics: AnalyticsService
  ) { }

  @Effect({ dispatch: false })
  trackToken$ = this.actions$
    .ofType(UserProfileActions.USER_PROFILE_RECIEVED)
    .map(toPayload)
    .do(() => this.analytics.trackSignin());

  @Effect({ dispatch: false })
  trackSearch$ = this.actions$
    .ofType(PlayerSearchActions.SEARCH_NEW_QUERY, PlayerSearchActions.SEARCH_MORE_FOR_QUERY)
    .map(toPayload)
    .do(() => this.analytics.trackSearch());

  @Effect({ dispatch: false })
  trackPlay$ = this.actions$
    .ofType(ActionTypes.PLAY_STARTED)
    .map(toPayload)
    .do(() => this.analytics.trackVideoPlay());
}
