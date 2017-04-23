import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { AppNavbarComponent } from './app-navbar.component';
import { AppNavbarMenuComponent } from './app-navbar-menu';
import { AppNavbarUserComponent } from './app-navbar-user';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    AppNavbarComponent,
    AppNavbarMenuComponent,
    AppNavbarUserComponent
  ],
  exports: [
    AppNavbarComponent
  ]
})
export class AppNavbarModule { }
