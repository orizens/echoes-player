import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared';

import { Navigator } from './navigator.component';

@NgModule({
  imports: [
    SharedModule,
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
