import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppLayoutService } from '../../services/app-layout.service';
import { PlayerSearchService } from '../../services/player-search.service';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./app-sidebar.scss'],
  template: `
  <div id="sidebar" class="sidebar ux-maker"
    [class.closed]="sidebarCollapsed$ | async">
    <div class="sidebar-backdrop" (click)="toggleSidebar()"></div>
    <nav class="navbar navbar-transparent">
      <app-brand></app-brand>
      <app-navigator [closed]="sidebarCollapsed$ | async" [searchType]="searchType$ | async">
      </app-navigator>
    </nav>
    <now-playing></now-playing>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarComponent {
  sidebarCollapsed$ = this.appLayoutService.appLayout$.map(layout => layout.sidebarExpanded);

  searchType$ = this.playerSearchService.playerSearch$.map(search => search.searchType);

  constructor(private appLayoutService: AppLayoutService,
              private playerSearchService: PlayerSearchService) { }

  toggleSidebar() {
    this.appLayoutService.toggleSidebar();
  }
}
