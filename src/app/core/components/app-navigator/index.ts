import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared';

import { AppNavigatorComponent } from './app-navigator.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    AppNavigatorComponent
  ],
  exports: [
    AppNavigatorComponent
  ],
  providers: []
})
export class AppNavigatorModule { }

// export * from './navigator.component';
