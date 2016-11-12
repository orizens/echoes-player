import { NgModule } from '@angular/core';
import { CoreStoreModule } from '../core/store';
import { CoreModule } from '../core';

import { AppNavbar } from './app-navbar.component';

@NgModule({
  imports: [
    CoreStoreModule,
    CoreModule
  ],
  declarations: [
    AppNavbar
  ],
  exports: [
    AppNavbar
  ]
})
export class AppNavbarModule { }
