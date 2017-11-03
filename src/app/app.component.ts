import { VersionCheckerService } from './core/services/version-checker.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { EchoesState } from './core/store';
import { getSidebarCollapsed$, getAppTheme } from './core/store/app-layout';

import { Store } from '@ngrx/store';
import 'rxjs/add/operator/let';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);
  theme$ = this.store.select(getAppTheme);

  @HostBinding('class')
  style = 'arctic';

  constructor(private store: Store<EchoesState>, private versionCheckerService: VersionCheckerService) {
    versionCheckerService.start();
  }

  ngOnInit() {
    this.theme$.subscribe(theme => this.style = theme);
  }
}
