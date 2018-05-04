import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { EchoesState } from '../../core/store';

import { ActivatedRoute, Data } from '@angular/router';
import { AppPlayerApi } from '../../core/api/app-player.api';
import { AppApi } from '../../core/api/app.api';

import { AuthorizationFire, FirebaseStoreService } from '../../core/services/firebase';

@Injectable()
export class PlaygroundProxy {
  public items$;

  constructor(
    public store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi,
    private appApi: AppApi,

    private fb: AuthorizationFire,
    private fs: FirebaseStoreService
  ) {
    // this.items$ = this.fb.users;
    // this.fb.getUsers();
  }
}
