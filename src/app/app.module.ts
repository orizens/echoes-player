import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { APP_CORE_MODULES } from './core/components';
import { APP_CONTAINER_MODULES } from './containers';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { AppAppComponent } from './core/components/app-app/app-app.component';

@NgModule({
  declarations: [
    AppComponent,
    AppAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule,

    CoreModule,
    SharedModule,
    ...APP_CORE_MODULES,
    ...APP_CONTAINER_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
