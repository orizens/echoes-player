import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/index';

import { AppSidebarComponent } from './app-sidebar.component';
import { AppBrandModule } from '../app-brand';
import { AppNavigatorModule } from '../app-navigator';
import { NowPlayingModule } from '../now-playing';

import { AppSidebarProxy } from './app-sidebar.proxy';

@NgModule({
  imports: [
    SharedModule,
    AppBrandModule,
    AppNavigatorModule,
    NowPlayingModule
  ],
  exports: [AppSidebarComponent],
  declarations: [AppSidebarComponent],
  providers: [AppSidebarProxy],
})
export class AppSidebarModule { }
