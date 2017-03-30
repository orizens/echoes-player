import { Component, ViewEncapsulation } from '@angular/core';

import { EchoesState, getSidebarCollapsed$ } from './core/store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/let';
// import { Notify } from '@ngrx/notify';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <player class="navbar navbar-default navbar-fixed-bottom"></player>

    <div id="sidebar" class="sidebar sidebar-left-fixed ux-maker"
      [class.closed]="sidebarCollapsed$ | async">
      <nav class="navbar navbar-transparent">
        <app-brand></app-brand>
        <navigator></navigator>
      </nav>
      <now-playing></now-playing>
    </div>

    <div class="container-fluid container-main">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  sidebarCollapsed$ = this.store.let(getSidebarCollapsed$);

  constructor(
    private store: Store<EchoesState>
  ) {
  }
}
