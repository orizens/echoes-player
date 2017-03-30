import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { SharedModule } from './shared';

// COMPONENTS
import { APP_CORE_MODULES } from './core/components';
import { APP_CONTAINER_MODULES } from './containers';
import { ROUTES } from './app.routes';
import { ENV_PROVIDERS } from './environment';

// SERVICES
// import { APP_SERVICES } from './core/services';

// import { NOTIFY_PROVIDERS, NOTIFY_GLOBAL_OPTIONS } from '@ngrx/notify';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    SharedModule,
    CoreModule,

    ...APP_CORE_MODULES,
    ...APP_CONTAINER_MODULES
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS
  ]
})
export class AppModule {}
