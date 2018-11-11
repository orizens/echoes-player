import { AppApi } from '@api/app.api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  styleUrls: ['./app-brand.scss'],
  template: `
  <div class="brand-container bg-primary"
    (click)="toggleSidebar()">
    <section class="brand-text">
      <h3 class="text brand-text-item">Ech</h3>
      <icon name="headphones" class="brand-icon brand-text-item"></icon>
      <h3 class="text brand-text-item">es</h3>
    </section>
    <button class="btn btn-transparent sidebar-toggle">
      <icon name="bars 2x"></icon>
    </button>
  </div>
  `
})
export class AppBrandComponent implements OnInit {
  constructor(private appApi: AppApi) {}
  ngOnInit() {}

  toggleSidebar() {
    return this.appApi.toggleSidebar();
  }
}
