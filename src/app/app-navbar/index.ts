import { NgModule } from '@angular/core';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';

import { AppNavbar } from './app-navbar.component';

@NgModule({
  imports: [
    SharedModule,
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
