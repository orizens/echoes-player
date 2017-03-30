import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { AppNavbar } from './app-navbar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AppNavbar
  ],
  exports: [
    AppNavbar
  ]
})
export class AppNavbarModule { }
