import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { EchoesState } from "../store";
import { UserProfileActions } from '../store/user-profile.actions';

import { UserManager } from '../services/user-manager.service';

@Injectable()
export class UserProfileEffects {

  constructor(
    private store$: StateUpdates<EchoesState>,
    private userProfileActions: UserProfileActions,
    private userManager: UserManager
  ){}

  @Effect() updateToken$ = this.store$
    .whenAction(UserProfileActions.UPDATE_TOKEN)
    .map<string>(toPayload)
    .map(token => this.userManager.setAccessToken(token))
    .switchMap(string => this.userManager.getPlaylists(true))
    .map(response => this.userProfileActions.updateData(response));

  @Effect() addUserPlaylists$ = this.store$
    .whenAction(UserProfileActions.UPDATE)
    .map<any>(toPayload)
    .map(data =>this.userProfileActions.addPlaylists(data.items));

  @Effect() updateNextPageToken$ = this.store$
    .whenAction(UserProfileActions.UPDATE)
    .map<any>(toPayload)
    .map(data => {
      const nextPageToken = data.nextPageToken;
      return nextPageToken
        ? this.userProfileActions.updatePageToken(data.nextPageToken)
        : this.userProfileActions.userProfileCompleted();
    });

  @Effect() getMorePlaylists$ = this.store$
    .whenAction(UserProfileActions.UPDATE_NEXT_PAGE_TOKEN)
    .map<any>(toPayload)
    .switchMap(pageToken => {
      this.userManager.updatePageToken(pageToken);
      return this.userManager.getPlaylists(false);
    })
    .map(response => this.userProfileActions.updateData(response));
}
