/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';

// import {Home} from './home/home';
import { YoutubeVideos } from './youtube-videos/youtube-videos';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [...ROUTER_DIRECTIVES, RouterActive],
  pipes: [],
  styles: [],
  template: require('./app.html')
  //         <li router-active="active">
  //           <a [routerLink]=" ['Index'] ">Index</a>
  //         </li>
  //         <li router-active="active">
  //           <a [routerLink]=" ['Home'] ">Home</a>
  //         </li>
  //       </ul>
  //     </nav>
  //   </header>

})
@RouteConfig([
  { path: '/', component: YoutubeVideos, name: 'Index' },
  // { path: '/home', component: Home, name: 'Home' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {

  constructor() {

  }
}
