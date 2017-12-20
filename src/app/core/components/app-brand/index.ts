import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';

import { AppBrandComponent } from './app-brand.component';

@NgModule({
  imports: [SharedModule],
  exports: [AppBrandComponent],
  declarations: [AppBrandComponent],
  providers: [],
})
export class AppBrandModule { }
