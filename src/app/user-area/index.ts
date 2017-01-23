import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AppNavbarModule } from '../app-navbar';

import { UserArea } from './user-area.component';
import { routing } from './user-area.routing';

@NgModule({
  imports: [
    SharedModule,
    AppNavbarModule,
    routing
  ],
  declarations: [
    UserArea
  ],
  exports: [
    UserArea
  ]
})
export class UserAreaModule { }
