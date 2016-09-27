import { NgModule } from '@angular/core';
import { CoreStoreModule } from '../core/store';
import { CoreModule } from '../core';

import { UserArea } from './user-area.component';

@NgModule({
  imports: [
    CoreStoreModule,
    CoreModule
  ],
  declarations: [
    UserArea
  ],
  exports: [
    UserArea
  ]
})
export class UserAreaModule { }
