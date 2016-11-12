import { NgModule } from '@angular/core';
import { CoreStoreModule } from '../core/store';
import { CoreModule } from '../core';
import { AppNavbarModule } from '../app-navbar';

import { UserArea } from './user-area.component';
import { routing } from './user-area.routing';

@NgModule({
  imports: [
    CoreStoreModule,
    CoreModule,
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
