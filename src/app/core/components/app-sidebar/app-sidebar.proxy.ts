import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppApi } from '@api/app.api';
import { EchoesState } from '@store/reducers';

import { getSidebarCollapsed } from '@store/app-core';
import * as PlayerSearch from '@store/player-search';

@Injectable()
export class AppSidebarProxy {
  sidebarCollapsed$ = this.store.select(getSidebarCollapsed);
  searchType$ = this.store.select(PlayerSearch.getSearchType);

  constructor(private store: Store<EchoesState>, private appApi: AppApi) {}

  toggleSidebar() {
    this.appApi.toggleSidebar();
  }
}
