import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../store';

import { getSidebarCollapsed$ } from '../../store/app-layout';
import { getSearchType$ } from '../../store/player-search';
import { AppLayoutService } from '../../services/app-layout.service';

@Injectable()
export class AppSidebarProxy {

  sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);
  searchType$ = this.store.let(getSearchType$);

  constructor(
    private store: Store<EchoesState>,
    private appLayoutService: AppLayoutService) { }

  toggleSidebar() {
    // this.appApi.toggleSidebar();
    return this.appLayoutService.toggleSidebar();
  }
}
