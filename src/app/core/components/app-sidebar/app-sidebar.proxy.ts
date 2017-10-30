import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppApi } from '../../api/app.api';
import { EchoesState } from '../../store';

import { getSidebarCollapsed$ } from '../../store/app-layout';
import { getSearchType$ } from '../../store/player-search';
import * as AppLayout from '../../store/app-layout';

@Injectable()
export class AppSidebarProxy {

  sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);
  searchType$ = this.store.let(getSearchType$);

  constructor(
    private store: Store<EchoesState>,
    private appApi: AppApi) { }

  toggleSidebar() {
    this.appApi.toggleSidebar();
  }
}
