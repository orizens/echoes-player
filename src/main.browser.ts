/*
 * Providers provided by Angular
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { ApplicationRef } from '@angular/core';
import { bootloader } from '@angularclass/hmr';
/*
* Platform and Environment
* our providers/directives/pipes
*/
// import { PLATFORM_PROVIDERS } from './platform/browser';
// import { ENV_PROVIDERS } from './platform/environment';

// import { provideStore } from '@ngrx/store';
// // import { instrumentStore } from '@ngrx/store-devtools';
// // import { useLogMonitor } from '@ngrx/store-log-monitor';
// import { runEffects } from '@ngrx/effects';

// import store from './app/core/store';
// import { actions } from './app/core/store';
// import effects from './app/core/effects'

// import services from './app/core/services';


// import 'rxjs/Rx';

/*
* App Component
* our top level component that holds all of our components
*/
// import { App, APP_PROVIDERS } from './app';
import { AppModule } from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(): Promise<any> {

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    // .then(decorateModuleRef)
    .catch(err => console.error(err));

  // return bootstrap(App, [
    // To add more vendor providers please look in the platform/ folder
    // ...PLATFORM_PROVIDERS,
    // ...ENV_PROVIDERS,
	    //...DIRECTIVES,
	    //...PIPES,
		// ...HTTP_PROVIDERS,
		// ...ROUTER_PROVIDERS,

		// ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy }),
    // ...APP_PROVIDERS,
    // services,
    // provideStore(store),
    // runEffects(effects),
    // actions,
    /*instrumentStore({
      monitor: useLogMonitor({
        position: 'right',
        visible: false
      })
    })*/
  // ])
  // .then(decorateComponentRef)
  // .catch(err => console.error(err));

}


bootloader(main);