import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { EchoesState } from '../store';
import * as AppLayout from '../store/app-layout';
import * as RouterActions from '../store/router-store';

@Injectable()
export class AppApi {
  constructor(
    private store: Store<EchoesState>
  ) { }

  toggleSidebar() {
    this.store.dispatch(new AppLayout.ToggleSidebar());
  }

  navigateBack() {
    this.store.dispatch(new RouterActions.Back());
  }
}
