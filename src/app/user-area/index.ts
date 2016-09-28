import { NgModule } from '@angular/core';
import { CoreStoreModule } from '../core/store';
import { CoreModule } from '../core';

import { UserArea } from './user-area.component';
import { routing } from './user-area.routing';

@NgModule({
  imports: [
    CoreStoreModule,
    CoreModule,
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
