import { NowPlaylistService } from '@core/services';
import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { toPayload } from '@utils/data.utils';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import * as AppLayout from '@store/app-layout';
import { VersionCheckerService } from '@core/services/version-checker.service';

@Injectable()
export class AppSettingsEffects {
  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public versionCheckerService: VersionCheckerService
  ) {}

  @Effect({ dispatch: false })
  updateAppVersion$ = this.actions$
    .ofType(AppLayout.ActionTypes.APP_UPDATE_VERSION)
    .map(() => this.versionCheckerService.updateVersion());

  @Effect({ dispatch: false })
  checkForNewAppVersion$ = this.actions$
    .ofType(AppLayout.ActionTypes.APP_CHECK_VERSION)
    .map(() => this.versionCheckerService.checkForVersion());
}
