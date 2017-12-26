import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';
import { RouterModule } from '@angular/router';

import { AppNavbarComponent } from './app-navbar.component';
import { AppNavbarMenuComponent } from './app-navbar-menu';
import { AppNavbarUserComponent } from './app-navbar-user';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
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
