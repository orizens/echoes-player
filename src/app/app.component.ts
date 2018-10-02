import { Store, select } from '@ngrx/store';
import { VersionCheckerService } from './core/services/version-checker.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { EchoesState } from '@store/reducers';
import { getSidebarCollapsed, getAppTheme } from '@store/app-layout';
import { AppApi } from '@core/api/app.api';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarCollapsed$ = this.store.pipe(select(getSidebarCollapsed));
  theme$ = this.store.select(getAppTheme);

  @HostBinding('class') style = 'arctic';

  constructor(
    private store: Store<EchoesState>,
    private versionCheckerService: VersionCheckerService,
    private appApi: AppApi
  ) {
    versionCheckerService.start();
    appApi.checkUserAuth();
  }

  ngOnInit() {
    this.theme$.subscribe(theme => (this.style = theme));
  }
}
