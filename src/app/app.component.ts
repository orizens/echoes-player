import { VersionCheckerService } from './core/services/version-checker.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { EchoesState } from './core/store';
import { getSidebarCollapsed$ } from './core/store/app-layout';

import { Store } from '@ngrx/store';
import 'rxjs/add/operator/let';
import { AppLayoutService } from './core/services/app-layout.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);
  // theme$ = this.store.select(getAppTheme);
  theme$ = this.appLayoutService.appLayout$.map(layout => layout.theme);

  @HostBinding('class')
  style = 'arctic';

  constructor(private store: Store<EchoesState>, private versionCheckerService: VersionCheckerService,
              private appLayoutService: AppLayoutService) {
    versionCheckerService.start();
  }

  ngOnInit() {
    this.theme$.subscribe(theme => this.style = theme);
  }
}
