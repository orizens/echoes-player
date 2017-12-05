import { VersionCheckerService } from './core/services';
import { Component, HostBinding, OnInit } from '@angular/core';

import 'rxjs/add/operator/let';
import { AppLayoutService } from './core/services/app-layout.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);
  // noinspection JSUnusedGlobalSymbols
  sidebarCollapsed$ = this.appLayoutService.appLayout$.map(layout => layout.sidebarExpanded);
  // theme$ = this.store.select(getAppTheme);
  theme$ = this.appLayoutService.appLayout$.map(layout => layout.theme);

  @HostBinding('class')
  style = 'arctic';

  constructor(private versionCheckerService: VersionCheckerService,
              private appLayoutService: AppLayoutService) {
    versionCheckerService.start();
  }

  ngOnInit() {
    this.theme$.subscribe(theme => this.style = theme);
  }
}
