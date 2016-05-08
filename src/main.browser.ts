/*
 * Providers provided by Angular
 */
import {bootstrap} from '@angular/platform-browser-dynamic';

/*
* Platform and Environment
* our providers/directives/pipes
*/
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

// import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from '@angular2/router';
// import {HTTP_PROVIDERS} from '@angular2/http';
import {store} from './app/core/store/store';

import 'rxjs/Rx';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
// enableProdMode();
export function main() {
	return bootstrap(App, [
		...PROVIDERS,
	    ...ENV_PROVIDERS,
	    ...DIRECTIVES,
	    ...PIPES,
		// ...HTTP_PROVIDERS,
		// ...ROUTER_PROVIDERS,

		// ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy }),
	    store
	])
	.catch(err => console.error(err));
}




/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */
 
/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}