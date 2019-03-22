import { AppPlayerModule } from './app-player';
import { AppNavigatorModule } from './app-navigator';
import { NowPlayingModule } from './now-playing';
import { AppBrandModule } from './app-brand';
import { AppSidebarModule } from './app-sidebar';
import { AppErrorHandlerModule } from './app-error-handler';

export const APP_CORE_MODULES = [
  AppPlayerModule,
  AppSidebarModule,
  AppErrorHandlerModule
];
