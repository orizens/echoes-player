import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import { AppLayoutActions } from '../../store/app-layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  styleUrls: [ './app-brand.scss' ],
  template: `
  <div class="brand-container bg-primary"
    (click)="toggleSidebar()">
    <section class="brand-text">
      <h3 class="text">Ech</h3>
      <h3 class="brand-icon fa fa-headphones"></h3>
      <h3 class="text">es</h3>
    </section>
    <button class="btn btn-transparent sidebar-toggle">
      <i class="fa fa-bars"></i>
    </button>
  </div>
  `
})

export class AppBrandComponent implements OnInit {

  constructor(
    private appLayoutActions: AppLayoutActions,
    private store: Store<EchoesState>
  ) {}
  ngOnInit() { }

  toggleSidebar () {
    return this.store.dispatch(this.appLayoutActions.toggleSidebar());
  }
}
