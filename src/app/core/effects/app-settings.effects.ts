import { NowPlaylistService } from '../services';
import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AppLayoutActions } from '../store/app-layout';
import { VersionCheckerService } from '../services/version-checker.service';

@Injectable()
export class AppSettingsEffects {

  constructor(
    public actions$: Actions,
    public store: Store<EchoesState>,
    public appLayoutActions: AppLayoutActions,
    public versionCheckerService: VersionCheckerService
  ) { }

  @Effect({ dispatch: false })
  updateAppVersion$ = this.actions$
    .ofType(AppLayoutActions.APP_UPDATE_VERSION)
    .map(() => this.versionCheckerService.updateVersion());

  @Effect({ dispatch: false })
  checkForNewAppVersion$ = this.actions$
    .ofType(AppLayoutActions.APP_CHECK_VERSION)
    .map(() => this.versionCheckerService.checkForVersion());
}
