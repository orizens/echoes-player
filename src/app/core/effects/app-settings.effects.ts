import { NowPlaylistService } from '@core/services';
import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { toPayload } from '@utils/data.utils';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromAppLayout from '@store/app-layout';
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
    .ofType(fromAppLayout.ActionTypes.APP_UPDATE_VERSION)
    .pipe(map(() => this.versionCheckerService.updateVersion()));

  @Effect({ dispatch: false })
  checkForNewAppVersion$ = this.actions$
    .ofType(fromAppLayout.ActionTypes.APP_CHECK_VERSION)
    .pipe(map(() => this.versionCheckerService.checkForVersion()));
}
