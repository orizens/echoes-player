import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

import { AppNavbarComponent } from './app-navbar.component';
import { AppNavbarMenuComponent } from './app-navbar-menu';
import { AppNavbarUserComponent } from './app-navbar-user';
import { AppNavbarProxy } from './app-navbar.proxy';

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
    AppNavbarComponent,
    AppNavbarUserComponent
  ],
  providers: [AppNavbarProxy]
})
export class AppNavbarModule { }
