import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';
import { AppErrorHandlerComponent } from './app-error-handler.component';
import { AppErrorHandlerProxy } from './app-error-handler.proxy';

@NgModule({
  declarations: [AppErrorHandlerComponent],
  imports: [SharedModule],
  exports: [AppErrorHandlerComponent],
  providers: [AppErrorHandlerProxy]
})
export class AppErrorHandlerModule {}
