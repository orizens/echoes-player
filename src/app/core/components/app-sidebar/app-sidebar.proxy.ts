import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '../../store';

import { getSidebarCollapsed$ } from '../../store/app-layout';
import { getSearchType$ } from '../../store/player-search';
import { AppLayoutService } from '../../services/app-layout.service';
import { PlayerSearchService } from '../../services/player-search.service';

@Injectable()
export class AppSidebarProxy {

  sidebarCollapsed$ = this.appLayoutService.appLayout$.map(layout => layout.sidebarExpanded);
  searchType$ = this.playerSearchService.playerSearch$.map(search => search.searchType);

  constructor(
    private appLayoutService: AppLayoutService,
    private playerSearchService: PlayerSearchService) { }

  toggleSidebar() {
    // this.appApi.toggleSidebar();
    return this.appLayoutService.toggleSidebar();
  }
}
