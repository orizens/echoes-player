import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core';
import { CoreStoreModule } from '../core/store';

import { Navigator } from './navigator.component';

@NgModule({
  imports: [
    CoreModule,
    CoreStoreModule,
    RouterModule
  ],
  declarations: [
    Navigator
  ],
  exports: [
    Navigator
  ],
  providers: []
})
export class NavigatorModule { }

// export * from './navigator.component';
