/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';

// import {Home} from './home/home';
import { InfiniteScroll } from './core/directives/infinite-scroll/infinite-scroll';
import { YoutubeVideos } from './youtube-videos/youtube-videos';
import { YoutubeSearch } from './core/services/youtube.search';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS, YoutubeSearch],
  directives: [...ROUTER_DIRECTIVES, RouterActive, InfiniteScroll],
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
  public start = true;

  constructor(public youtubeSearch: YoutubeSearch) {
  }

  onScroll () {
    if (this.start) {
      this.start = false;
      return;
    }
    this.youtubeSearch.searchMore();
  }
}
