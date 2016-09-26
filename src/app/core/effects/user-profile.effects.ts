import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { EchoesState } from "../store";
import { UserProfileActions } from '../store/user-profile.actions';

import { UserProfile } from '../services/user-profile.service';

@Injectable()
export class UserProfileEffects {

  constructor(
    private actions$: Actions,
    // private store$: StateUpdates<EchoesState>,
    private userProfileActions: UserProfileActions,
    private userProfile: UserProfile
  ){}

  @Effect() updateToken$ = this.actions$
    .ofType(UserProfileActions.UPDATE_TOKEN)
    .map(action => action.payload)
    .map((token: string) => this.userProfile.setAccessToken(token))
    .switchMap(string => this.userProfile.getPlaylists(true))
    .map(response => this.userProfileActions.updateData(response));

  @Effect() addUserPlaylists$ = this.actions$
    .ofType(UserProfileActions.UPDATE)
    .map(action => action.payload)
    .map((data: any) =>this.userProfileActions.addPlaylists(data.items));

  @Effect() updateNextPageToken$ = this.actions$
    .ofType(UserProfileActions.UPDATE)
    .map(action => action.payload)
    .map(data => {
      const nextPageToken = data.nextPageToken;
      return nextPageToken
        ? this.userProfileActions.updatePageToken(data.nextPageToken)
        : this.userProfileActions.userProfileCompleted();
    });

  @Effect() getMorePlaylists$ = this.actions$
    .ofType(UserProfileActions.UPDATE_NEXT_PAGE_TOKEN)
    .map(action => action.payload)
    .switchMap((pageToken: string) => {
      this.userProfile.updatePageToken(pageToken);
      return this.userProfile.getPlaylists(false);
    })
    .map(response => this.userProfileActions.updateData(response));
}
