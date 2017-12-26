import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { AppBrandComponent } from './app-brand.component';

@NgModule({
  imports: [SharedModule],
  exports: [AppBrandComponent],
  declarations: [AppBrandComponent],
  providers: [],
})
export class AppBrandModule { }
