import { Store } from '@ngrx/store';
import { EchoesState } from '@store/reducers';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

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
  updateAppVersion$ = this.actions$.pipe(
    ofType(fromAppLayout.ActionTypes.APP_UPDATE_VERSION),
    map(() => this.versionCheckerService.updateVersion())
  );

  @Effect({ dispatch: false })
  checkForNewAppVersion$ = this.actions$.pipe(
    ofType(fromAppLayout.ActionTypes.APP_CHECK_VERSION),
    map(() => this.versionCheckerService.checkForVersion())
  );
}
