import { EchoesState } from '../../store';
import { Store } from '@ngrx/store';
import { AppLayoutActions } from '../../store/app-layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import './app-brand.scss';

@Component({
  selector: 'app-brand',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app-brand.scss' ],
  template: `
  <div class="navbar-brand col-md-12 bg-primary"
    (click)="toggleSidebar()">
    <span class="text">Ech</span>
    <i class="fa fa-headphones"></i>
    <span class="text">es</span>
    <button class="btn btn-navbar btn-link ux-maker sidebar-toggle pull-right hidden-lg">
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
