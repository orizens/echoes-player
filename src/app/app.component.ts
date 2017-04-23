import { VersionCheckerService } from './core/services/version-checker.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { EchoesState, getSidebarCollapsed$ } from './core/store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/let';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);

  constructor(
    private store: Store<EchoesState>,
    private versionCheckerService: VersionCheckerService
  ) {
    versionCheckerService.start();
  }
}
